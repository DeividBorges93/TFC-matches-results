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

