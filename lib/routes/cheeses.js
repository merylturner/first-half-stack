const connection = require('../db');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');

module.exports = function cheeses(req, res) {
    const cheeses = connection.db.collection('cheeses');

    if (req.method === 'POST') {
        cheeses.insert(req.body)
            .then(result => result.ops[0])
            .then(saved => {
                res.end(JSON.stringify(saved));
            })
            .catch(console.log);
    }
    else if (req.method === 'GET' && req.url.params.id !== undefined) {
        const id = req.url.params.id;
        cheeses.findOne({ _id: new ObjectID(id) })
            .then(result => {
                if (result === null) notFound(req, res);
                else res.end(JSON.stringify(result));
            })
            .catch(console.log);
    }
    else if (req.method === 'GET') {
        cheeses.find({}).toArray()
            .then(cheeses => res.end(JSON.stringify(cheeses)))
            .catch(console.log);
    }
    else {
        notFound(req, res);
    }
};