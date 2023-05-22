const fs = require('fs');

let indexHtml = fs.readFileSync('./index.html', 'utf8');
let bundleJs = fs.readFileSync('./dist/bundle.js', 'utf8');
let styleCss = fs.readFileSync('./style.css', 'utf8');

indexHtml = indexHtml.replace('<link href="style.css" rel="stylesheet">', `<style>${styleCss}</style>`);
indexHtml = indexHtml.replace('<script type="module" src="dist/bundle.js"> </script>', `<script>${bundleJs}</script>`);



fs.writeFileSync('./dist/index.html', indexHtml);
