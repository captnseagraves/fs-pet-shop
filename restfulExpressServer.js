const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const port = 8000;

const app = express();

app.disable('x-powered-by');
app.use(bodyParser())

app.get('/pets', (req, res) => {
    fs.readFile('pets.json', 'utf8', (err, jsonData) => {
        var pets = JSON.parse(jsonData);
        res.send(pets)
    })
})

app.get('/pets/:id', (req, res) => {
    let id = req.params.id
    fs.readFile('pets.json', 'utf8', (err, jsonData) => {
        var pets = JSON.parse(jsonData);
        if (pets[id]) {
            res.send(pets[id])
        } else {
            app.set('Content-type', 'text/plain')
            res.sendStatus(404);
        }
    })
})

app.post('/pets', (req, res) => {
    fs.readFile('pets.json', 'utf8', (err, jsonData) => {
        var pets = JSON.parse(jsonData);
        if (req.body.age && req.body.kind && req.body.kind) {
            pets.push(req.body)
            fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
                if (err) throw err;
            })
            res.send(req.body)
        } else {
            app.set('Content-type', 'text/plain')
            res.sendStatus(400);
        }
    })
})

app.patch('/pets/:id', (req, res) => {
    let id = req.params.id
    fs.readFile('pets.json', 'utf8', (err, jsonData) => {
        var pets = JSON.parse(jsonData);
        if (pets[id]) {
            for (var key in req.body) {
                pets[id][key] = req.body[key]
            }
            fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
                if (err) throw err;
            })
            res.send(pets[id])
        } else {
            app.set('Content-type', 'text/plain')
            res.sendStatus(400);
        }
    })
})

app.delete('/pets/:id', (req, res) => {
    let id = req.params.id
    fs.readFile('pets.json', 'utf8', (err, jsonData) => {
        var pets = JSON.parse(jsonData);
        if (pets[id]) {
            res.send(pets[id])
            pets.splice(id, 1)
            fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
                if (err) throw err;
            })
        } else {
            app.set('Content-type', 'text/plain')
            res.sendStatus(400);
        }
    })
})


app.listen(port, () => {
    console.log('listening on port ', port);
})

module.exports = app
