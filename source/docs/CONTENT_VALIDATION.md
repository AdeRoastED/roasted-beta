# Automated content validation

Records checked: **29610** (answer records = native × item × target), items: 6042, conversations: 24, word-list words: 134.

Automated checks find structural problems (wrong answer keys, missing romanization, duplicates…). They **cannot** judge whether a sentence is natural or correct — that needs native speakers.

| Severity | Check | Count |
|---|---|---:|
| INFO | option-equals-native | 70 |
| INFO | parallel-diff | 30 |
| INFO | punctuation-only-diff | 50 |
| WARN | case-only-diff | 5 |

## Errors (first 50)


## Warnings (first 80)

- **case-only-diff** it>en culture#3: two options differ only by capital letters — check it is a fair question — `["She read a book about italian history.","She read a book about Italian history.","She read a book on italy history.","She read a book of Italy history."]`
- **case-only-diff** fr>en culture#3: two options differ only by capital letters — check it is a fair question — `["She read a book about italian history.","She read a book about Italian history.","She read a book on italy history.","She read a book of Italy history."]`
- **case-only-diff** de>en culture#3: two options differ only by capital letters — check it is a fair question — `["She read a book about italian history.","She read a book about Italian history.","She read a book on italy history.","She read a book of Italy history."]`
- **case-only-diff** th>en culture#3: two options differ only by capital letters — check it is a fair question — `["She read a book about italian history.","She read a book about Italian history.","She read a book on italy history.","She read a book of Italy history."]`
- **case-only-diff** af>en culture#3: two options differ only by capital letters — check it is a fair question — `["She read a book about italian history.","She read a book about Italian history.","She read a book on italy history.","She read a book of Italy history."]`

Full list with every item: `content_validation.json`.