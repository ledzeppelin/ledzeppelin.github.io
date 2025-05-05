all: deps common-words aii-number-list scaffold schema-check dict isolates-check validate-dynamic-conj validate-conj-forms
some: scaffold schema-check dict isolates-check validate-dynamic-conj
scan-articles: missing-roots validate-conj-patterns

deps:
	brew install lua jq brotli luarocks
# 	brew install colordiff
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

	@if [ -f js/consts/aii-dict.js ]; then \
		cp js/consts/aii-dict.js js/consts/aii-dict.prev.js; \
	fi

	@if [ -f js/consts/aii-dict.min.js.gz ]; then \
		cp js/consts/aii-dict.min.js.gz js/consts/aii-dict.min.prev.js.gz; \
	fi

	cd js && node cli/add-props-to-dictionary.js > ./consts/aii-dict.js

	cd js && node cli/numbers-table-json-to-obj.js > ./consts/aii-numbers-table.js

	cd js && uglifyjs consts/aii-dict.js --output consts/aii-dict.min.js
	cd js && gzip -k -f consts/aii-dict.js consts/aii-dict.min.js
	python3 py/size_check.py
	cd js && brotli -4 -f consts/aii-dict.js -o consts/aii-dict.js.l4.br
	cd js && brotli -4 -f consts/aii-dict.min.js -o consts/aii-dict.min.js.l4.br

	python3 py/index_tags.py > js/json/indexed-tags.json

	python3 py/vars/verb_templates.py

	python3 py/vars/generate_verb_schemas.py
	cd js && gzip -k -f consts/conj-schemas.js

	@if [ -f js/consts/aii-dict-tags.js ]; then \
		cp js/consts/aii-dict-tags.js js/consts/aii-dict-tags.prev.js; \
	fi
	cd js && node cli/create-tag-search-obj.js > ./consts/aii-dict-tags.js



diff-dict:
	colordiff js/consts/aii-dict.prev.js js/consts/aii-dict.js

diff-tags:
	colordiff js/consts/aii-dict-tags.prev.js js/consts/aii-dict-tags.js

dict-with-audio: export AII_DICT_GENERATE_AUDIO=1
dict-with-audio: dict

dict-with-audio-cache: export AII_DICT_GENERATE_AUDIO=1
dict-with-audio-cache: export USE_CACHED_AUDIO=1
dict-with-audio-cache: dict

download:
	python3 py/download_datadump.py

datadump-diff:
	python3 py/validators/datadump_diff.py

schema-check:
	python3 py/validators/schema_check.py

isolates-check:
	python3 py/validators/isolates.py

missing-roots:
	python py/misc/wiktionary/verbs_with_templates_missing_roots.py

validate-conj-patterns:
	python py/dynamic_conj/validator.py

validate-dynamic-conj:
	python py/dynamic_conj/test_aii_conj.py

validate-conj-forms:
	cd js && node cli/verb-conjugation.tests.js
