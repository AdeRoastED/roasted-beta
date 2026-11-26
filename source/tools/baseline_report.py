#!/usr/bin/env python3
"""
baseline_report.py — READ-ONLY review of the translation guard diff.
Groups every difference between data/*.js and tools/translation_baseline.json into categories,
so a human can decide what to approve. It NEVER changes the baseline or the data files.

  python3 tools/baseline_report.py [out_dir]   -> BASELINE_DIFF_REPORT.md + baseline_diff.csv
"""
import csv, json, os, re, sys
from collections import Counter, defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import translation_guard as G

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(G.ROOT, 'docs')
os.makedirs(OUT, exist_ok=True)
base = G.flatten(json.load(open(G.BASELINE_PATH, encoding='utf-8'))['data'])
cur = G.flatten(G.load_all_current())
SP = re.compile(r'[   ]+([?!])')
def nosp(x):
    if isinstance(x, str): return SP.sub(r'\1', x)
    if isinstance(x, list): return [nosp(y) for y in x]
    if isinstance(x, dict): return {k: nosp(v) for k, v in x.items()}
    return x
TENSE = {'pres', 'past', 'fut', 'neg', 'ques'}
rows = []
added = [k for k in cur if k not in base]
removed = [k for k in base if k not in cur]
common = [k for k in cur if k in base and cur[k] != base[k]]
# removed+added pairs that only differ by the French "space before ? !" rule (key = sentence changed)
add_by_norm = defaultdict(list)
for k in added: add_by_norm[(k[0], k[1], nosp(k[2]), k[3])].append(k)
paired = set()
for k in removed:
    m = add_by_norm.get((k[0], k[1], nosp(k[2]), k[3]))
    if m:
        a = m[0]; paired.add(a); paired.add(k)
        same = nosp(base[k]) == nosp(cur[a])
        rows.append(('RENAMED: French spacing rule (sentence key changed)' + ('' if same else ' + other changes'), k, base[k], cur[a]))
# removed+added pairs where the NATIVE sentence itself was edited (e.g. "crowded with people" fix, German friend corrections)
import difflib
for k in removed:
    if k in paired: continue
    best, bs = None, 0.0
    for a in added:
        if a in paired or a[0] != k[0] or a[1] != k[1] or a[3] != k[3]: continue
        r = difflib.SequenceMatcher(None, k[2], a[2]).ratio()
        if base[k].get('f') == cur[a].get('f'): r += 0.5
        if r > bs: best, bs = a, r
    if best and bs >= 0.6:
        paired.add(best); paired.add(k)
        rows.append(('EDITED: native sentence changed (key changed) — CHECK it was an approved correction', k, base[k], dict(cur[best], _new_sentence=best[2])))
for k in added:
    if k in paired: continue
    lang, tp, s, tgt = k
    if tp == 'num': cat = 'ADDED: numbers 100+ (Intermediate/Advanced)'
    elif tp in TENSE: cat = 'ADDED: grammar topic items (new verbs per level)'
    elif tp in ('food','travel','sports','culture','dailylife'): cat = 'ADDED: new sentences (topics expanded to 30, Level 3)'
    elif tp in ('pron','verbs','months','dir'): cat = 'ADDED: new topic ' + tp + ' (created after the baseline)'
    else: cat = 'ADDED: new items in existing vocabulary topic ' + tp + ' (more levels)'
    rows.append((cat, k, None, cur[k]))
for k in removed:
    if k in paired: continue
    cat = 'REMOVED: old generated grammar items (replaced by new verbs in v28)' if k[1] in TENSE else 'REMOVED: ' + k[1]
    rows.append((cat, k, base[k], None))
for k in common:
    b, c = base[k], cur[k]
    if nosp(b) == c: cat = 'MODIFIED: French spacing rule only (space before ? !)'
    else:
        ch = sorted(f for f in set(b) | set(c) if b.get(f) != c.get(f))
        fields = '+'.join(ch)
        if ch == ['r']: cat = 'MODIFIED: roast text only'
        elif set(ch) <= {'ph'}: cat = 'MODIFIED: Thai romanization only'
        elif 'f' in ch or 'c' in ch: cat = 'MODIFIED: correct answer changed (' + fields + ') — CHECK'
        else: cat = 'MODIFIED: options/distractors (' + fields + ')'
    rows.append((cat, k, b, c))
cnt = Counter(r[0] for r in rows)
with open(os.path.join(OUT, 'baseline_diff.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(['category', 'native', 'topic', 'native_sentence', 'target', 'baseline', 'current'])
    for cat, k, b, c in sorted(rows, key=lambda r: (r[0], r[1])):
        w.writerow([cat, k[0], k[1], k[2], k[3], json.dumps(b, ensure_ascii=False) if b else '', json.dumps(c, ensure_ascii=False) if c else ''])
L = ['# Translation guard — baseline diff review', '',
     'Read-only report. The baseline (`tools/translation_baseline.json`, created 2026-11-16) was **not** changed or approved.', '',
     f'Raw guard totals: **{len(added)} added, {len(removed)} removed, {len(common)} modified** (records = native × topic × sentence × target).', '',
     'Before the v37 audit the guard reported 20,290 added, 175 removed, 587 modified. The v37 audit added 53 modified records: the "Both…" question fixes (categories `f+sf`, `ns`, `o` — see NS_QUESTIONS_CHANGES.md). Nothing else in the data was changed by the audit.', '',
     '| Category | Records | Needs human decision? |', '|---|---:|---|']
for cat, n in sorted(cnt.items()):
    need = 'YES — Thai speaker' if 'romanization' in cat else ('YES — native check' if ('CHECK' in cat or 'distractors' in cat or 'roast' in cat or 'ADDED' in cat) else 'confirm the rule, then approve')
    L.append(f'| {cat} | {n} | {need} |')
L += ['', 'Full list: `baseline_diff.csv` (one row per record, with baseline and current values).', '', '## Samples per category', '']
by = defaultdict(list)
for r in rows: by[r[0]].append(r)
for cat in sorted(by):
    L.append(f'### {cat}')
    for c, k, b, cu in by[cat][:4]:
        L.append(f'- `{k[0]}.{k[1]}` “{k[2]}” → {k[3]}')
        if b and cu: L.append(f'  - before: `{json.dumps({x: b.get(x) for x in ("o","f","r") if x in b}, ensure_ascii=False)[:300]}`'); L.append(f'  - now: `{json.dumps({x: cu.get(x) for x in ("o","f","r") if x in cu}, ensure_ascii=False)[:300]}`')
    L.append('')
open(os.path.join(OUT, 'BASELINE_DIFF_REPORT.md'), 'w', encoding='utf-8').write('\n'.join(L))
print(dict(cnt)); print('added', len(added), 'removed', len(removed), 'modified', len(common))
