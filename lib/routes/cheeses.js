const connection = require('../db');

module.exports = function cheeses(req,res) {
    const cheeses = connection.db.collection('cheeses');

    if(req.method === 'POST') {
        cheeses.insert(req.body)
            .then(result => result.ops[0])
            .then(saved => {
                res.end(JSON.stringify(saved));
            })
            .catch(console.log);
    }
    else if (req.method === 'GET') {
        cheeses.find({}).toArray()
            .then(cheeses => res.end(JSON.stringify(cheeses)))
            .catch(console.log);
    }
};