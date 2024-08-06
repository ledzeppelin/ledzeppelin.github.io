all: deps webapps

up:
	docker compose up -d --build --remove-orphans

down:
	docker compose down --remove-orphans

sass-watch-all:
	sass --watch shared_sass \
	assyrian-bible/sass:assyrian-bible/css \
	assyrian-transliterator/sass:assyrian-transliterator/css \
	searchable-assyrian-bible/sass:searchable-assyrian-bible/css \
	assyrian-dictionary/sass:assyrian-dictionary/css \
	about-me/sass:about-me/css \
	new-bet-nahrain/sass:new-bet-nahrain/css \
	assyrian-bible-study/sass:assyrian-bible-study/css

deps:
	pip3 install pylint
	npm install -g sass-lint sass uglify-js

webapps:
	cd assyrian-bible && make all
	cd assyrian-transliterator && make all
	cd searchable-assyrian-bible && make all
	cd assyrian-dictionary && make all
	cd new-bet-nahrain && make all
	cd assyrian-bible-study && make all
	cd shared_js && make all
