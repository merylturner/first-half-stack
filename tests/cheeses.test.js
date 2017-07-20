const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;

const connection = require('../lib/db');
const url = 'mongodb://localhost:27017/cheeses-test';

const app = require('../lib/app');

describe('cheese resource', () => {
    
    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());
    
    const request = chai.request(app);

    it('saves', () => {
        const cheese = { name: 'cheddar', origin: 'England'};
        return request.post('/cheeses')
            .send(cheese)
            .then(res => {
                const saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, cheese.name);
                assert.equal(saved.origin, cheese.origin);
            });
    });
});