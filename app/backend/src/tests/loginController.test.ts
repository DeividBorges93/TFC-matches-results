import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/user';
import { app } from '../app';
import Jwt from '../utils/jwt';

chai.use(chaiHttp);

const { expect } = chai;
const jwt = new Jwt();

const userMockData = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  // senha: secret_admin
};

const userMockNull = null;

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjEyODg5ODEsImV4cCI6MTY2MTM3NTM4MX0.NcHdSrqWzBxC9Tbi_h0FlL044lg_8sThecGlAxUrTak';

describe('Login route', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('LoginController.login', () => {
    
    describe('When receiving valid data in the request of the route "/login"', () => {
      beforeEach(() => {
        const { stub } = sinon;
  
        stub(User, 'findOne').resolves(userMockData as User);
      })
  
      it('status HTTP 200 OK', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });
  
        expect(response.status).to.be.equal(200);
      });
  
      it('return a token OK', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });
  
        expect(response.body).to.be.haveOwnProperty('token');
        expect(response.body.token).to.be.a('string');
      });
    });
  
    describe('When NOT receiving valid data in the request of the route "/login"', () => {
      describe('if user does not exist', () => {
        beforeEach(() => {
          const { stub } = sinon;
    
          stub(User, 'findOne').resolves(userMockNull);
        })
    
        it('status 401 Unauthorized', async () => {
          const response = await chai.request(app).post('/login').send({
            email: 'any-email',
            password: 'any-hash',
          });
    
          expect(response.status).to.be.equal(401);
        });
    
        it('return a message "Incorrect email or password"', async () => {
          const response = await chai.request(app).post('/login').send({
            email: 'any-email',
            password: 'any-hash',
          });
    
          expect(response.body).to.be.haveOwnProperty('message');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.be.equal('Incorrect email or password');
        })
      })
    
      describe('if "email" does not exist', () => {
        beforeEach(() => {
          const { stub } = sinon;
    
          stub(User, 'findOne').resolves(userMockData as User);
        })
    
        it('status 400 bad_request', async () => {
          const response = await chai.request(app).post('/login').send({
            password: 'secret_admin',
          });
          
          expect(response.status).to.be.equal(400);
        })
    
        it('return a message "All fields must be filled"', async () => {
          const response = await chai.request(app).post('/login').send({
            password: 'secret_admin',
          });
    
          expect(response.body).to.be.haveOwnProperty('message');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.be.equal('All fields must be filled');
        })
      })
    
      describe('if "password" does not exist', () => {
        beforeEach(() => {
          const { stub } = sinon;
    
          stub(User, 'findOne').resolves(userMockData as User);
        })
    
        it('status 400 bad_request', async () => {
          const response = await chai.request(app).post('/login').send({
            email: 'admin@admin.com',
          });
          
          expect(response.status).to.be.equal(400);
        })
    
        it('return a message "All fields must be filled"', async () => {
          const response = await chai.request(app).post('/login').send({
            email: 'admin@admin.com',
          });
    
          expect(response.body).to.be.haveOwnProperty('message');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.be.equal('All fields must be filled');
        })
      })
    })
  })
  describe('LoginController.validate', () => {
    describe('when token validation is a success', () => {
      beforeEach(() => {
        const { stub } = sinon;
  
        stub(jwt, 'decrypt').returns(userMockData);
      })
  
      it('status HTTP 200 OK', async () => {
        const response = await chai.request(app).get('/login/validate').set({
          authorization: tokenMock,
        });
  
        expect(response.status).to.be.equal(200);
      })

      it('return a "role" OK', async () => {
        const response = await chai.request(app).get('/login/validate').set({
          authorization: tokenMock,
        });

        expect(response.body).to.be.haveOwnProperty('role');
        expect(response.body.role).to.be.a('string');
      })
    })

    describe('when token validation NOT is a sucess', () => {
      beforeEach(() => {
        const { stub } = sinon;
  
        stub(jwt, 'decrypt').returns(userMockData);
      })

      it('status HTTP 401 Unauthorized', async () => {
        const response = await chai.request(app).get('/login/validate').set({
          authorization: '',
        });

        expect(response.status).to.be.equal(401);
      })

      it('return a message "Token does not exist"', async () => {
        const response = await chai.request(app).get('/login/validate').set({
          authorization: '',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.be.equal('Token does not exist');
      })
    })
  })
})
