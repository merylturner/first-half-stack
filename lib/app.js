const express = require('express');
const app = express();
// const path = require('path');
// const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const connection = require('./db');
// const cheeses = require('./routes/cheeses');
// const parseUrl = require('./utils/parse-url');
// const notFound = require('./utils/not-found');

app.use(bodyParser.json());

app.post('/cheeses', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    cheeses.insert(req.body)
        .then(res => res.ops[0])
        .then(cheese => res.send(cheese))
        .catch(console.log);
});

module.exports = app;
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