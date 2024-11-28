const fs = require('fs');

const {
  booksChapters,
} = require('../../../shared_js/consts/books-chapters');

const websiteUrl = 'https://www.sharrukin.io/assyrian-bible/';

const generateSitemap = (_booksChapters) => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  _booksChapters.forEach(([book, chapters]) => {
    for (let chapter = 1; chapter <= chapters; chapter += 1) {
      const url = `${websiteUrl}?book=${book}&amp;chapter=${chapter}`;
      sitemap += `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
    }
  });

  sitemap += '</urlset>';
  return sitemap;
};

const sitemap = generateSitemap(booksChapters);

fs.writeFile('../../sitemap.xml', sitemap, (err) => {
  if (err) {
    console.error('Error writing the file:', err);
  }
});
