var chai = require('chai');
var expect = chai.expect;
var request = require('superagent');

var settings = require('../../core/settings.server');
var serverPort = settings.server.port.test;
var base = 'http://localhost:' + serverPort;

var vlaidUser = {
  username: 'root',
  password: 'root',
};

var newUser = {
  username: 'test',
  password: 'test',
};

describe('User Module', function() {
  var app;

  before(function() {
    // launch the server
    app = require('../../app');
  });

  after(function() {
    app.httpServer.close();
  });

  describe('general routing', function() {
    var paths = [
      // '/user/register',
      '/user/login',
      '/user/logout',
    ];

    paths.forEach(function(path) {
      it(
        'should respond 200 to GET ' + path,
        function(done) {
          request
            .get(base + path)
            .end(function(err, res) {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              done();
            });
        }
      );
    });
  });

  describe('login required routing', function() {
    var token;
    var paths = [
      '/user',
      '/user/profile',
    ];

    before(function(done) {
      request
        .post(base + '/api/users/login')
        .send(vlaidUser)
        .end(function(err, res) {
          token = res.body.data.bearerToken;
          done();
        });
    });

    paths.forEach(function(path) {
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
        function(done) {
          request
            .get(base + path)
            .set('authorization', 'Bearer ' + token)
            .end(function(err, res) {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              done();
            });
        }
      );
    });
  });

  describe('API', function() {
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

    describe('POST /api/users/login', function() {
      it('should respond with a valid token', function(done) {
        request
          .post(base + '/api/users/login')
          .send(vlaidUser)
          .end(function(err, res) {
            expect(res).to.not.be.undefined;

            var jwt = require('jwt-simple');
            var decoded = jwt.decode(
              res.body.data.bearerToken,
              settings.user.bearerToken.secret
            );
            var actualUser = decoded.user;

            expect(actualUser.username).to.equal(vlaidUser.username);
            done();
          });
      });
    });
  });
});