# ledzeppelin.github.io

Webapp subdirectories will each have an `index.html` that can be accessed directly in your web browser.  However to preview webapps on your phone and support cross origin requests, install docker desktop, then run `make up` for a dockerized webserver where individual webapps can be accessed via

* http://localhost:8000/assyrian-bible
* http://localhost:8000/assyrian-transliterator

Github pages will ignore directories starting with an underscore

### Generating favicons for apps

Download and install NotoSansSyriac-Black from https://fonts.google.com/noto/specimen/Noto+Sans+Syriac

Export png from favicon.psd using favicon sizes from https://www.emergeinteractive.com/insights/detail/the-essentials-of-favicons/

### SublimeLinter packages used

Run `dev-env` prior to any development

| SublimeLinter Package                   | Requirements |
| :---                                    | :---- |
| SublimeLinter-eslint                    | `npm install --include=dev` in `js` subdir of all webapps |
| SublimeLinter-pylint                    | `pip3 install pylint` |
| SublimeLinter-contrib-sass-lint, Sass   | `npm install -g sass-lint` |
