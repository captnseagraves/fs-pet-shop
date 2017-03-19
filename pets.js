'use strict'

const fs = require('fs');
const path = require('path');

const node = path.basename(process.argv[0])
const file = path.basename(process.argv[1])
const arg3 = process.argv[2];

if (!arg3) {
    console.log(`Usage: ${node} ${file} [read | create | update | destroy]`);
}

if (arg3 === "read") {
    let ind = process.argv[3]
    if (!ind) {
        fs.readFile('pets.json', 'utf8', function(err, data) {
            if (err) throw err;
            let parsedData = JSON.parse(data);
            console.log(parsedData);
        });
    } else {
        fs.readFile('pets.json', 'utf8', function(err, data) {
            if (err) throw err;
            let parsedData = JSON.parse(data);
            if (parsedData[ind]) {
                console.log(parsedData[ind]);
            } else {
                console.log('Usage: node pets.js read INDEX');
            }
        })
    }
}

if (arg3 === "create") {
    let age = process.argv[3];
    let kind = process.argv[4];
    let name = process.argv[5];
    if (!age) {
        console.log('Usage: node pets.js create AGE KIND NAME');
    }
    if (!kind) {
        console.log('Usage: node pets.js create AGE KIND NAME');
    }
    if (name) {
        fs.readFile('pets.json', 'utf8', function(err, data) {
            if (err) throw err;
            let parsedData = JSON.parse(data);
            let newPet = {
              age,
              kind,
              name
            };
            // console.log(newPet);
            parsedData.push(newPet);
            fs.writeFile('pets.json', JSON.stringify(parsedData), function(err) {
                if (err) throw err;
                let parsedData = JSON.parse(data);
                console.log(parsedData);
            })
        })
    }
}
