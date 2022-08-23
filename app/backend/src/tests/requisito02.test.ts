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

