'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var petsPath = path.join(__dirname, 'pets.json');
var port = process.env.PORT || 8000;

var app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());



    app.get('/pets', function(req, res) {
      fs.readFile('pets.json', 'utf8', function(err, petsJSON) {
          var pets = JSON.parse(petsJSON);
        res.send(pets);
      })
    })

    app.get('/pets/:id', function(req, res) {
      fs.readFile('pets.json', 'utf8', function(err, petsJSON) {
          var pets = JSON.parse(petsJSON);

        let id = req.params.id
        if (!isNaN(id) && id >= 0 && id < pets.length) {
            res.send(pets[id]);
        } else {
            res.set('Content-type', 'text/plain')
            res.sendStatus(404);
        }
          });
    })

    app.post('/pets', function(req, res) {
      fs.readFile('pets.json', 'utf8', function(err, petsJSON) {
          var pets = JSON.parse(petsJSON);
        let body = req.body;
        pets.push(req.body)
        if (req.body.age && req.body.kind && req.body.name) {
            fs.writeFile('pets.json', JSON.stringify(pets), function(err) {
                if (err) throw err;
                res.send(req.body);
            })
        } else {
            res.set('Content-type', 'text/plain')
            res.sendStatus(400);
        }
      })
    })

    app.patch('/pets/:id', function(req, res) {
      fs.readFile('pets.json', 'utf8', function(err, petsJSON) {
          var pets = JSON.parse(petsJSON);
        let id = req.params.id;
        if (!isNaN(id) && id >= 0 && id < pets.length) {
            for (let key in req.body) {
                pets[id][key] = req.body[key]
            }
            fs.writeFile('pets.json', JSON.stringify(pets), function(err) {
                if (err) throw err;
            })
            res.set('Content-type', 'application/json')
            res.send(pets[id])
        } else {
            res.set('Content-type', 'text/plain')
            res.sendStatus(404);
        }
      })
    })

    app.delete('/pets/:id', function(req, res) {
      fs.readFile('pets.json', 'utf8', function(err, petsJSON) {
          var pets = JSON.parse(petsJSON);
        let id = req.params.id;
        if (pets[id]) {
          res.set('Content-type', 'application/json')
          res.send(pets[id]);
            pets = pets.splice(id, 1);
            fs.writeFile('pets.json', JSON.stringify(pets), function(err) {
              if (err) throw err;
            })
        }
        else {
          console.log('3');
            res.set('Content-type', 'text/plain')
            res.sendStatus(404);
        }
      })
    })



app.listen(port, function() {
    console.log('Listening on port', port);
});

module.exports = app
