all:: deps bible
bible:: scrape-chapters process-verses mark-verses phonetic-tests

deps::
	pip3 install -r _scraper/requirements.txt
	cd js && npm install

scrape-chapters::
	cd _scraper && time scrapy runspider --nolog scrape_bible_chapters.py -O ../js/bible-verses.json

# TODO: stderr should say `make scrape-chapters` needs to run first
process-verses::
	cd js && node parse-bible-verses.js > bible.min.js
# 	cd js && node parse-bible-verses.js | node_modules/uglify-js/bin/uglifyjs --output bible.min.js

mark-verses::
	cd js && node parse-mark-verses.js > ../../assyrian-transliterator/js/aii-mark.js

phonetic-tests::
	cd js && node parse-mark-chapter-1.js > ../../assyrian-transliterator/js/phonetic-tests.json

# convert unicode string to string literal for debugging purposes
convert-verses::
	cd js && cat bible-verses.json | jq > bible-verses-str-literal.json
