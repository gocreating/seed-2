import chai from 'chai';
import request from 'superagent';
import settings from '../../core/settings.server';

const expect = chai.expect;
const serverPort = settings.server.port.test;
const base = 'http://localhost:' + serverPort;

describe('Core Module', () => {
  // launch the server
  let app = require('../../app');

  describe('general routing', () => {
    const paths = [
      '/',
      '/about',
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
});