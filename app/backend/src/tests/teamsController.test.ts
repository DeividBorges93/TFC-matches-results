import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]

const teamMock = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
}

describe('Teams route', () => {
  afterEach(() => {
    sinon.restore();
  })
  describe('TeamsController.findAll', () => {
    describe('When receiving valid data in the request of the route "/teams"', () => {
      beforeEach(() => {
        const { stub } = sinon;

        stub(Team, 'findAll').resolves(teamsMock as Team[]);
      })

      it('status HTTP 200 OK', async () => {
        const response = await chai.request(app).get('/teams');
        
        expect(response.status).to.be.equal(200);
      });

      it('return an array of teams OK', async () => {
        const response = await chai.request(app).get('/teams');

        expect(response.body).to.be.a('array');
        expect(response.body).to.be.eql(teamsMock);
      })
    })
  })

  describe('TeamsController.findByPk', () => {
    describe('When receiving valid data in the request of the route "/teams/:id"', () => {
      beforeEach(() => {
        const { stub } = sinon;

        stub(Team, 'findByPk').resolves(teamMock as Team);
      })

      it('status HTTP 200 OK', async () => {
        const response = await chai.request(app).get('/teams/1');
        
        expect(response.status).to.be.equal(200);
      });

      it('return an array of teams OK', async () => {
        const response = await chai.request(app).get('/teams/1');

        expect(response.body).to.be.a('object');
        expect(response.body).to.be.eql(teamMock);
      })
    })
  })
})