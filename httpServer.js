'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url')
const port = process.env.PORT || 6000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json')

    let pathname = url.parse(req.url).pathname;
    let pathArr = pathname.match(/[^/]+/g);
    let file = pathArr[0];
    let index = pathArr[1]

    fs.readFile(`${file}.json`, 'utf8', (err, data) => {
        let parse = JSON.parse(data)
        if (err) {
            res.statusCode = 404
            res.setHeader('Content-type', 'text/plain')
            res.end("Not Found")
            console.log('1');
        }
        if (!index) {
            res.end(data)
            console.log('2');
        } else {
            if (parse[index]) {
                res.end(JSON.stringify(parse[index]))
                console.log('3');
            }
            if (!parse[index]) {
                res.statusCode = 404
                res.setHeader('Content-type', 'text/plain')
                res.end("Not Found")
                console.log('4');
            }
        }

    })

})


server.listen(port, function() {
    console.log('Listening on port', port);
});

module.exports = server;
