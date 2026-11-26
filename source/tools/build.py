#!/usr/bin/env python3
"""
RoastED build script — ONE source, TWO builds.

  python3 tools/build.py            -> dist/normal  and  dist/qa

normal : the app for real users/testers. QA tools (qa.js) are physically removed.
         Storage keys 'roasted*' and caches 'roasted-v*' stay exactly as before (existing progress keeps working).
qa     : same app + qa.js. Separate storage ('roastedqa*'), separate caches ('roasted-qa-v*'),
         separate install name ("RoastED QA"). Deploy it in a DIFFERENT folder from the normal app.

Never copied into either build: tools/ (translation guard + baseline), tests/, docs/, *.md, dev files.
The source files are never modified by this script.
"""
import json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist') if len(sys.argv) < 2 else os.path.abspath(sys.argv[1])
APP_FILES = ['index.html', 'style.css', 'app.js', 'monet.js', 'report.js', 'qa.js', 'sw.js', 'manifest.json', 'LICENSE']
APP_DIRS = ['data', 'images']
QA_CFG = "<script>window.APP_CFG={kind:'qa',store:'roastedqa',cache:'roasted-qa-v'}</script>"

def read(p):
    with open(p, encoding='utf-8') as f: return f.read()
def write(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f: f.write(s)

def build(kind):
    out = os.path.join(DIST, kind)
    if os.path.exists(out): shutil.rmtree(out)
    os.makedirs(out)
    for d in APP_DIRS:
        shutil.copytree(os.path.join(ROOT, d), os.path.join(out, d))
    for f in APP_FILES:
        if kind == 'normal' and f == 'qa.js': continue
        shutil.copy2(os.path.join(ROOT, f), os.path.join(out, f))
    # index.html
    h = read(os.path.join(out, 'index.html'))
    assert h.count('<!--CFG-->') == 1 and h.count('<!--QA-->') == 1, 'index.html markers missing'
    if kind == 'normal':
        h = h.replace('<!--CFG-->', '')
        h = re.sub(r'<!--QA-->.*?<!--/QA-->', '', h, flags=re.S)
    else:
        h = h.replace('<!--CFG-->', QA_CFG)
        h = h.replace('<!--QA-->', '').replace('<!--/QA-->', '')
        h = re.sub(r'<title>(.*?)</title>', r'<title>\1 · QA</title>', h, count=1)
    write(os.path.join(out, 'index.html'), h)
    # service worker: cache prefix + precache list
    s = read(os.path.join(out, 'sw.js'))
    assert "const CP='roasted-v'" in s
    if kind == 'normal':
        assert s.count(' "qa.js",') == 1
        s = s.replace(' "qa.js",', '')
    else:
        s = s.replace("const CP='roasted-v'", "const CP='roasted-qa-v'")
    write(os.path.join(out, 'sw.js'), s)
    # manifest
    if kind == 'qa':
        m = json.loads(read(os.path.join(out, 'manifest.json')))
        m.update({'name': 'RoastED QA', 'short_name': 'RoastED QA', 'id': 'roasted-qa'})
        write(os.path.join(out, 'manifest.json'), json.dumps(m, ensure_ascii=False))
    # safety checks
    allf = []
    for dp, _, fs in os.walk(out):
        for f in fs: allf.append(os.path.relpath(os.path.join(dp, f), out))
    bad = [f for f in allf if f.startswith(('tools', 'tests', 'docs')) or f.endswith(('.py', '.md')) or 'baseline' in f]
    assert not bad, bad
    if kind == 'normal':
        assert 'qa.js' not in allf
        for f in ('index.html', 'sw.js', 'app.js'):
            assert 'qa.js' not in read(os.path.join(out, f)) or f == 'app.js', f
        assert 'APP_CFG={kind' not in read(os.path.join(out, 'index.html'))
    # every precached file must exist
    pre = json.loads('[' + re.search(r'PRE=\[(.*?)\]', read(os.path.join(out, 'sw.js')), re.S).group(1) + ']')
    missing = [p for p in pre if p not in ('./',) and not os.path.exists(os.path.join(out, p))]
    assert not missing, ('precache missing', missing)
    print(kind, len(allf), 'files ->', out)

if __name__ == '__main__':
    for k in ('normal', 'qa'): build(k)
