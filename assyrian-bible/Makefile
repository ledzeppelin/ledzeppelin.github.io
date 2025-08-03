all: deps bible
bible: scrape-chapters process-verses generate-sitemap mark-verses

deps:
	pip3 install -r _scraper/requirements.txt

scrape-chapters:
	cd _scraper && time scrapy runspider --set FEED_EXPORT_ENCODING=utf-8 --nolog scrape_bible_chapters.py -O ../js/bible-verses.json

# TODO: stderr should say `make scrape-chapters` needs to run first
process-verses:
	cd js && node cli/parse-bible-verses.js > consts/bible.min.js

generate-sitemap:
	cd js && node cli/generate-sitemap.js

mark-verses:
	cd js && node cli/parse-mark-verses.js > ../../assyrian-transliterator/js/consts/aii-mark.js
