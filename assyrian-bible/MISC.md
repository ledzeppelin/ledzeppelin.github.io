### notes
scripts loaded before html, so we don't have to worry about the state before bible.min.js is downloaded
https://stackoverflow.com/a/5642299
https://stackoverflow.com/a/2920207


### test cases
- Matthew 17:21 // missing verse NLT
- Acts // long aii title

* font tweaks
	* support more ligatures
	* add western to google fonts with same fallback latin characters as estrangela/eastern
	* adding space after yudh ܥܘܢܝܬܐ, then undoing it causes the ligature not to form, doesn't form in safari https://fonts.google.com/noto/specimen/Noto+Sans+Syriac+Eastern?preview.text=%DC%A5%DC%98%DC%A2%DC%9D%DC%AC%DC%90, forms in chrome

after deploying, test incognito on mobile chrome mode w/o trailing slash
http://192.168.1.5:8000/assyrian-bible?book=MRK&chapter=1%3A18
http://192.168.1.5:8000/assyrian-bible/?book=MRK&chapter=1%3A18
and then navigate and observe query string parameters don't update

confirm og links respect query string params

check for margin collapsing on all webapps
