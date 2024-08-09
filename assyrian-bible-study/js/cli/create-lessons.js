const fs = require('fs');
const path = require('path');
const showdown = require('showdown');

const converter = new showdown.Converter();
const markdownPath = '../lessons/markdown/';
const htmlPath = '../lessons/html/';

fs.readdir(markdownPath, (err, files) => {
  files.forEach((markdownFile) => {
    // Read the Markdown file
    const markdownContent = fs.readFileSync(`${markdownPath}${markdownFile}`, 'utf8');

    // Convert Markdown to HTML
    const htmlContent = converter.makeHtml(markdownContent);

    // Create the full HTML structure
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Bible Study Lesson</title>
    <meta charset="UTF-8">
    <meta name="description" content="Assyrian Bible Study Lesson Plan">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    ${htmlContent}
</body>
</html>
`;

    const htmlFile = `${path.basename(markdownFile, path.extname(markdownFile))}.html`;
    const outputPath = `${htmlPath}${htmlFile}`;
    fs.writeFileSync(outputPath, fullHtml);
    console.log(`Generated ${htmlFile}`);
  });
});
