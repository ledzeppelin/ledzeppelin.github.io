# ledzeppelin.github.io

Webapp subdirectories will each have an index.html file that can be accessed directly in your web browser.  However to preview webapps on your phone and support cross origin requests, install docker desktop, then run `make up` for a dockerized webserver where individual webapps can be accessed via

* http://localhost:8000/assyrian-bible/
* http://localhost:8000/assyrian-transliterator/
* http://localhost:8000/searchable-assyrian-bible/

Github pages will ignore directories starting with an underscore.  Some webapp subdirectories will contain a Makefile - this is a helpful starting point to grokking how the webapp is cobbled together.

### Generating favicons and social media cards for apps

Click "Download family" from https://fonts.google.com/noto/specimen/Noto+Sans+Syriac?query=syriac, unzip and install NotoSansSyriac-VariableFont_wght.ttf

Export the pngs from favicon.psd using favicon sizes from https://www.emergeinteractive.com/insights/detail/the-essentials-of-favicons/

Export the jpgs from social_media_cards.psd with "Excellent" quality without any cropping of dimensions - they're already designed to handle cropping from 1280x720 (1200 x 675) to 1200 x 630 per dimensions: https://simplified.com/blog/design/open-graph-image-everything-you-need-to-know/ and also iMessage 1024 x 512

### SublimeLinter packages used

Run `make  dev-env` prior to any development

| SublimeLinter Package                   | Requirements |
| :---                                    | :---- |
| SublimeLinter-eslint                    | `npm install --include=dev` in `js` subdir of all webapps |
| SublimeLinter-pylint                    | `pip3 install pylint` |
| SublimeLinter-contrib-sass-lint, Sass   | `npm install -g sass-lint` |
