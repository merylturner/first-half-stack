const express = require('express');
const app = express();
// const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const connection = require('./db');
// const cheeses = require('./routes/cheeses');
// const parseUrl = require('./utils/parse-url');
// const notFound = require('./utils/not-found');

app.use(bodyParser.json());

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(404).send('Not found');
//     next();
// });

app.post('/cheeses', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    cheeses.insert(req.body)
        .then(res => res.ops[0])
        .then(cheese => res.send(cheese))
        .catch(console.log);
});

app.get('/cheeses', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    cheeses.find().toArray()
        .then(cheeseArray => res.send(cheeseArray))
        .catch(console.log);
});

app.get('/cheeses/:id', (req, res, next) => {
    // res.setHeader('Content-Type', 'text/html');
    const cheeses = connection.db.collection('cheeses');
    const id = req.params.id;
    // console.log('req is', req);
    if (id.length !== 24 || id === undefined) {
        res.status(404).send('Oh no!');
    }
    else next();
    cheeses.findOne({ _id: new ObjectID(id) })
        .then(cheese => res.send(cheese))
        .catch(console.log);

});
// .then(cheese => {
//     console.log('cheese is', cheese);
//     if (cheese === null) res.status(404).send('Oh no!');
// })

app.delete('/cheeses/:id', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    const id = req.params.id;
    cheeses.removeOne({ _id: new ObjectID(id) })
        .then(({ result }) => res.send({ removed: result.n === 1 }))
        .catch(console.log);

});

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});


module.exports = app;



//FOR QUERY ADDITION LATER
// const query = {};
// if(req.query.name) query.name = req.query.name;
// if(req.query.origin) query.origin = req.query.origin;
// const routes = {
//     cheeses
// };

// module.exports = function app(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     req.url = parseUrl(req.url);

//     bodyParser(req)
//         .then(body => req.body = body)
//         .then(() => {
//             const route = routes[req.url.route] || notFound;
//             route(req,res);
//         })
//         .catch(console.log);
// };