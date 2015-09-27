import chai from 'chai';
import request from 'superagent';
import settings from '../../core/settings.server';

const expect = chai.expect;
const serverPort = settings.server.port.test;
const base = 'http://localhost:' + serverPort;

const vlaidUser = {
  username: 'root',
  password: 'root',
};

const newUser = {
  username: 'test',
  password: 'test',
};

describe('User Module', () => {
  // launch the server
  let app = require('../../app');

  describe('general routing', () => {
    const paths = [
      // '/user/register',
      '/user/login',
      '/user/logout',
    ];

    paths.forEach((path) => {
      it(
        'should respond 200 to GET ' + path,
        (done) => {
          request
            .get(base + path)
            .end((err, res) => {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              done();
            });
        }
      );
    });
  });

  describe('login required routing', () => {
    let token;
    const paths = [
      '/user',
      '/user/profile',
    ];

    before((done) => {
      request
        .post(base + '/api/users/login')
        .send(vlaidUser)
        .end((err, res) => {
          token = res.body.data.bearerToken;
          done();
        });
    });

    paths.forEach((path) => {
      // it(
      //   'should respond 401 to GET ' + path + ' before login',
      //   function(done) {
      //     request
      //       .get(base + path)
      //       .end(function(err, res) {
      //         expect(res).to.not.be.undefined;
      //         expect(res.status).to.equal(401);
      //         done();
      //       });
      //   }
      // );

      it(
        'should respond 200 to GET ' + path + ' after login',
        (done) => {
          request
            .get(base + path)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              done();
            });
        }
      );
    });
  });

  describe('API', () => {
    // describe('POST /api/user', function() {
    //   it('should respond with a valid user', function(done) {
    //     request
    //       .post(base + '/api/user')
    //       .send(newUser)
    //       .end(function(err, res) {
    //         expect(res).to.not.be.undefined;
    //         var returnErrors = res.body.errors;
    //         var returnUser = res.body.data.user;
    //         expect(returnErrors).to.be.empty;
    //         expect(returnUser.username).to.equal(newUser.username);
    //         done();
    //       });
    //   });
    // });

    describe('POST /api/users/login', () => {
      it('should respond with a valid token', (done) => {
        request
          .post(base + '/api/users/login')
          .send(vlaidUser)
          .end((err, res) => {
            expect(res).to.not.be.undefined;

            const jwt = require('jwt-simple');
            const decoded = jwt.decode(
              res.body.data.bearerToken,
              settings.user.bearerToken.secret
            );
            const actualUser = decoded.user;

            expect(actualUser.username).to.equal(vlaidUser.username);
            done();
          });
      });
    });
  });
});