all:: deps bible audio

deps::
	pip3 install -r _scraper/requirements.txt
	cd js && npm install

scrape-chapters::
	cd _scraper && time scrapy runspider --nolog scrape_bible_chapters.py -O ../js/bible-verses.json

process-verses::
	cd js && node parse-bible-verses.js > bible.min.js
# 	cd js && node parse-bible-verses.js | node_modules/uglify-js/bin/uglifyjs --output bible.min.js

bible:: scrape-chapters process-verses

mp3s::
	cd js && node tts.js

audio:: bible mp3s
