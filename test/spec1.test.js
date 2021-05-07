const fs = require('fs'),
    expect = require('chai').expect,
    supertest = require('supertest'),
    app = require('../app'),
    server = app.listen(),
    api = supertest(server);

describe('#Index', () => {
    describe('GET', () => {
        it('Check undefined route does not exist', (done) => {
            api.get('/' + undefined)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(404);
                    done();
            });
        });
        it('Check home page', (done) => {
            api.get('/')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    done();
            });
        });
        it('Check validation error for secure route', (done) => {
            api.get('/secure')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(401)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(401);
                    done();
            });
        });
        it('Check secure route with wrong user or password', (done) => {
            api.get('/secure')
                .auth('test', 't')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(401)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(401);
                    done();
            });
        });
        it('Check secure route with sucess', (done) => {
            api.get('/secure')
                .auth('test', 'test')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    done();
            });
        });
    });
});