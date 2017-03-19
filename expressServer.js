'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var petsPath = path.join(__dirname, 'pets.json');
var port = process.env.PORT || 8000;

var app = express();

app.disable('x-powered-by');

fs.readFile(petsPath, 'utf8', function(err, petsJSON) {

  var pets = JSON.parse(petsJSON);
app.get('/pets', function(req, res) {
  res.send(pets);
})
  app.get('/pets/:id', function(req, res) {
    let id = req.params.id
    if (!isNaN(id) && id >= 0 && id < pets.length){
    res.send(pets[id]);
  }else {
    res.set('Content-type', 'text/plain')
    res.sendStatus(404);
  }
  })


  });


app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app
