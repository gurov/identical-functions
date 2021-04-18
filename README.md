# identical-functions
```bash
find node_modules -name '*.js' | xargs -n 1 nodejs index.js > info.csv
```


.separator ,
.import info.csv info

.schema info


sqlite> create table foo(a, b);
sqlite> .separator ,
sqlite> .import test.csv foo


SELECT COUNT(file), fn
FROM info
GROUP BY fn LIMIT 10;