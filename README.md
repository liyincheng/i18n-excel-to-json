## excel-to-json-iternational
A tool to transform excel file to json for i18n excel data or other similar usage.

```bash
# install
npm install -g excel-to-json-iternational
# run
excel-to-json-iternational i18n.xlsx
```
It will generate a json file based on your input file name. For example, run 'i18n.xlxs' will generate 'i18n.json' file
  
The Excel format looks like this:
```
key	zh	ja	ko
hello	你好	こんにちは	안녕하세요.
world	世界	世界	세계
```
The generated output will look like:
```
{
    "zh": {
        "hello": "你好",
        "world": "世界"
    },
    "ja": {
        "hello": "こんにちは",
        "world": "世界"
    },
    "ko": {
        "hello": "안녕하세요.",
        "world": "세계"
    }
}
```

