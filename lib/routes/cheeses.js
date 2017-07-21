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
            .then(cheese => {
                console.log('cheese is', cheese);
                if (cheese === null) {
                    notFound(req, res);
                    console.log('res.statusMessage is', res.statusMessage);
                    res.end(res.statusMessage);
                    console.log('not ending with res.end?');
                }
                else {
                    res.end(JSON.stringify(cheese));
                    console.log('cheese is', cheese);
                }
            })
            .then(err => console.log('before the catch', err))
            .catch(err => {
                console.log('in the catch');
                console.log(err);            
            });
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