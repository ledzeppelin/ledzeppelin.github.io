all: deps tests

deps:
	cd js && npm install

tests:
	cd js && node cli/aii-translit.tests.js
	cd js && node cli/tru-translit.tests.js
