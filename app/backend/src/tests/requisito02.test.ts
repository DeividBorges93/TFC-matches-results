import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/user';
import { app } from '../app';
import Jwt from '../utils/jwt';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';

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


const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjEyMDU3NDgsImV4cCI6MTY2MTI5MjE0OH0._cNv1Bti3_xFaWrsmvSwggMHbWUVaqz6XX-xEjI7kvc"

describe('Login route', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  describe('When receiving valid data in the request of the route "/login"', () => {
    beforeEach(() => {
      const { stub } = sinon;

      stub(User, 'findOne').resolves(userMockData as User);
      stub(bcrypt, 'compareSync').resolves(true);
      stub(jwt, 'encrypt').resolves(tokenMock);
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

})