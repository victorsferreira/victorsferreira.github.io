const $ = require('cheerio');
const fs = require("fs");

function releaseBuilder(cb) {
    const indexTemplate = fs.readFileSync('index.html.template', 'utf-8');

    const doc = $.load(indexTemplate);
    const ul = doc('ul');
    const releases = fs.readdirSync('releases');
    
    releases.map(releaseName => {
        const releaseVersion = releaseName.split('_')[1];
        ul.append(`<li><a href="releases/${releaseName}">${releaseVersion}</a></li>`)
    });

    fs.writeFile('index.html', doc.html(), cb);
}

exports.default = releaseBuilder;