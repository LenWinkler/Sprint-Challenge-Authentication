const request = require('supertest');

const server = require('../api/server.js');

jest.mock('../auth/authenticate-middleware.js', () => {
    return (req, res, next) => {
        next();
    }
});

describe('Jokes endpoint', function() {

    describe('GET /api/jokes', function() {

        it('should return 200 OK', async function() {
            return await request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('should return json', async function() {
            return await request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })
    })
})