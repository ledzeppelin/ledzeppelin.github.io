all: deps common-words aii-number-list scaffold schema-check dict isolates-check
deploy: deps common-words aii-number-list download scaffold schema-check dict-with-audio isolates-check
some: scaffold schema-check dict isolates-check

deps:
	brew install lua
	brew install jq
	brew install brotli
	brew install luarocks
	luarocks install dkjson
	cd js && npm install
	pip3 install -r requirements.txt

common-words:
	cd lua && lua common-words-to-json.lua > ../js/json/common-words.json

aii-number-list:
	cd lua && lua aii-number-list-to-json.lua > ../js/json/aii-number-list.json

scaffold:
	cat js/json/_aii.jsonl | jq > js/json/jq.aii.jsonl

dict:
	python3 py/dict_to_json.py
	cd js && node cli/add-props-to-dictionary.js > ./consts/aii-dict.js

	cd js && node cli/numbers-table-json-to-obj.js > ./consts/aii-numbers-table.js

	cd js && uglifyjs consts/aii-dict.js --output consts/aii-dict.min.js
	cd js && gzip -k -f consts/aii-dict.js && gzip -k -f consts/aii-dict.min.js
	cd js && brotli -4 -f consts/aii-dict.js -o consts/aii-dict.js.l4.br && brotli -4 -f consts/aii-dict.min.js -o consts/aii-dict.min.js.l4.br

	python3 py/index_tags.py > js/json/indexed-tags.json
	cd js && node cli/create-tag-search-obj.js > ./consts/aii-dict-tags.js

dict-with-audio: export AII_DICT_GENERATE_AUDIO=1
dict-with-audio: dict

download:
	python3 py/download_datadump.py

datadump-diff:
	python3 py/validators/datadump_diff.py

schema-check:
	python3 py/validators/schema_check.py

isolates-check:
	python3 py/validators/isolates.py
