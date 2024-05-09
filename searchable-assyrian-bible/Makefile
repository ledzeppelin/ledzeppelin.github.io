all: deps process-verses

deps:
	cd js && npm install

process-verses:
	cd js && node cli/parse-bible-verses.js > consts/searchable-bible.min.js
	cd js && gzip -k -f consts/searchable-bible.min.js
