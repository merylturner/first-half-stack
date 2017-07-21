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

    const cheese = [
        { name: 'cheddar', origin: 'England' },
        { name: 'brie', origin: 'France' },
        { name: 'havarti', origin: 'Denmark' }
    ];

    it('saves', () => {
        return request.post('/cheeses')
            .send(cheese)
            .then(res => {
                const saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, cheese[0].name);
                assert.equal(saved.origin, cheese[0].origin);
            });

    });
    // need to test that id property is on returned objects
    it('gets all', () => {
        return request.get('/cheeses')
            .then(res => {
                const got = res.body;
                assert.equal(got.length, cheese.length);
            });
    });

    it('get by id', () => {
        const gouda = { name: 'gouda', origin: 'Holland' };
        return request.post('/cheeses')
            .send(gouda)
            .then(res => res.body)
            .then(cheese => request.get(`/cheeses/${cheese._id}`))
            .then(res => {
                const got = res.body;
                assert.equal(got.origin, gouda.origin);
            });
    });

    it.only('returns code 404 if resource not found', () => {
        return request.get('/cheeses/123456789012345678901234')
            .then(res => {
                console.log('res in test is', res);
                // const status = res.statusMessage;
                assert.equal(res.StatusMessage, 404);
            });
    });
});