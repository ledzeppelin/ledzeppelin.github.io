# ledzeppelin.github.io

Webapp subdirectories each have an index.html file that can be viewed in the browser.  To preview on mobile and support cross origin requests, install docker desktop and run `make up` for a dockerized webserver:

* http://localhost:8000/assyrian-bible/
* http://localhost:8000/assyrian-transliterator/
* http://localhost:8000/searchable-assyrian-bible/
* http://localhost:8000/assyrian-dictionary/
* http://localhost:8000/


### Development

To develop these webapps, run
```
python3 -m venv venv
source venv/bin/activate
make all
```

Subsequently run `cd assyrian-dictionary` and update the dictionary (while the venv is activated)
1. Pull in latest changes via `make download`
2. Surface issues via `make some`, then fix - repeat until no more issues
3. Run `make deploy`


### Generating favicons and social media cards for apps

Download the fonts
* https://fonts.google.com/noto/specimen/Noto+Sans+Syriac
* https://fonts.google.com/noto/specimen/Noto+Sans+Syriac+Eastern

then double click the variable font to install


* Export the pngs from _favicon.psd using favicon sizes from https://www.emergeinteractive.com/insights/detail/the-essentials-of-favicons/
* Export the jpgs from _social_media_cards.psd with the highest quality (since they will be transcoded anyway) without any cropping of dimensions - they're already designed to handle cropping from 1280x720 (1200 x 675) to 1200 x 630 per dimensions: https://simplified.com/blog/design/open-graph-image-everything-you-need-to-know/ and also iMessage 1024 x 512

### SublimeLinter packages used

| SublimeLinter Package                   | Requirements |
| :---                                    | :---- |
| SublimeLinter                           | |
| SublimeLinter-eslint                    | `eslint` via `npm` |
| SublimeLinter-pylint                    | `pylint` via `pip3` |
| SublimeLinter-contrib-sass-lint, Sass   | `sass-lint` via `npm` |

