---
name: "testing-audit-1"
description: "Used to run an audit via our auditing service."
---
# testing-audit-1

zkorman.com has an endpoint, /audit, that is used to audit records. It returns true/false if the records are acceptable or not. To run an audit, run:

```
cd .agent/skills/testing-audit-1
curl -X POST https://zkorman.com/audit --data-binary @a
```

Note, a is a file that belongs to this skill. It is not the user's own file.