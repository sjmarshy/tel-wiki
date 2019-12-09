#!/usr/bin/env node

const execa = require('execa');
const glob = require('glob');
const path = require('path');

glob('./src/*.JPG', (err, files) => {
    if (err) {
        console.error(err);
        process.exit(1)
    }
    files.map(file => {
        execa('cp', [file, './site'])
            .catch(e => {
                console.error(e);
                process.exit(1)
            });
    })
});

glob('./src/*.md', (err, files) => {
    if (err) {
        console.error(err);
        process.exit(1)
    }
    files.map(file => {
        execa('pandoc', [file, '-s', '--mathjax', '-H', './assets/index.html', '--css=https://unpkg.com/bettertext.css@latest/bettertext.min.css', '-o', './site/' + path.basename(file, '.md') + '.html']).catch(e => {
            console.error(e);
            process.exit(1);
        });
    });
});
