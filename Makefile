up::
	docker compose up -d --build --remove-orphans
# 	docker compose up -d --build

down::
	docker compose down --remove-orphans

sass-watch-all::
	sass --watch shared_sass \
	assyrian-bible/sass:assyrian-bible/css \
	assyrian-transliterator/sass:assyrian-transliterator/css \

dev-env::
	pip3 install pylint
	npm install -g sass-lint
	cd assyrian-bible/js && npm install --include=dev
	cd assyrian-transliterator/js && npm install --include=dev
