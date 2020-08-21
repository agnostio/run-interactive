#!/usr/bin/env node
const fs = require('fs');
const xcon = require('x-con');
const picker = require('./picker');
const {spawn, exec} = require('child_process');
const path = require('path');


var wd = process.cwd();
let banner = require('./banner.js');
banner += `
    -  run-interactive

    A simple interactive CLI (command line interface) to run your npm scripts

    Because I like to keep my build tooling seperate from my editor...\n\n
`;
let scannedScripts;
let scripts = [];

try {
    scannedScripts = JSON.parse(fs.readFileSync(path.join(wd, './package.json'))).scripts;
    for (var prop in scannedScripts) {
        scripts.push({
            name: prop,
            value: scannedScripts[prop]
        });
    }
} catch (error) {
    console.log('\n\nScan of package.json failed\n\n');
    console.log(error);
    process.exit(); 
};



console.log();

let file = {
    path: null,
    folder: null,
    name: null,
    ext: 'txt',
    content: null
};
xcon.post([{
    txt: banner,
    color: '#00aa00',
    bold: true
}], () => {
    picker({
        question: 'script:',
        choices: scripts
    }).then((answer) => {
        exec(answer, function(err, stdout, stderr){
            console.log(stdout);
        });
        
        
                
    });
});
