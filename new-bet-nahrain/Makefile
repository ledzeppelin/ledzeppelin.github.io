all: deps tests

deps:
	brew install ffmpeg
	cd js && npm install

tests:
	cd js && node cli/poem.tests.js
