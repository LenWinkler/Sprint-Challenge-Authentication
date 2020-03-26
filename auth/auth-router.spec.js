const request = require('supertest');
const assert = require('assert');

const server = require('../api/server.js');

const db = require('../database/dbConfig.js');

describe('auth endpoints', function() {

    describe('POST /api/auth/register', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should return 201 OK', async function() {
            
            return await request(server)
            .post('/api/auth/register')
            .send({ username: "Len", password: "password" })
            .set('Accept', 'application/json')
            .expect(201)
        })

        it('should return json', async function() {
            return await request(server)
            .post('/api/auth/register')
            .send({ username: "Len", password: "password" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/i)
        })
    })

    describe('POST /api/auth/login', function() {

        it('should return 200 OK', async function() {

            return await request(server)
            .post('/api/auth/login')
            .send({ username: "Len", password: "password" })
            .set('Accept', 'application/json')
            .expect(200)
        })

        it('should return a token', async function() {

            return await request(server)
            .post('/api/auth/login')
            .send({ username: "Len", password: "password" })
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                assert(res.body.token)
            })
            })
        })
    })