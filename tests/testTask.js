const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { user } = require('../models')
const config = require('../config/config.json')
const { encodePassword } = require('../utils/cryptoUtil')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

describe('Task Routes', () => {
  let token = ''
  before((done) => {
    const password = "test"
    const secKey = Buffer.from(config.secret, 'base64').toString('utf8')
    const encPassword = encodePassword(password, secKey)

    user.create({
      username: 'test',
      password: encPassword
    }).then((u) => {
      token = jwt.sign({ 
        userId: u.id,
        username: u.username
      },
        config.secret,
        {
          expiresIn: '1h'
        }
      )
      done()
    })
  })

  after((done) => {
    user.destroy({
      where: {
        username: 'test'
      }
    }).then(() => {
      done()
    })
  })

  describe('Task Routes Add', () => {
    it('should failed without token', (done) => {
      chai.request(app)
        .post('/api/task/add')
        .send({
          startTime:"2020-03-03 17:00:00",
          eventTask:"test task",
        })
        .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body.message).to.contain('Validation failed')
        done()
      })
    })

    it('should failed with failed token', (done) => {
      chai.request(app)
        .post('/api/task/add')
        .set({ "Authorization": "test" })
        .send({
          startTime:"2020-03-03 17:00:00",
          eventTask:"test task",
        })
        .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body.message).to.contain('Token not provided')
        done()
      })
    })

    it('should failed with wrong token', (done) => {
      chai.request(app)
        .post('/api/task/add')
        .set({ "Authorization": "Bearer test" })
        .send({
          startTime:"2020-03-03 17:00:00",
          eventTask:"test task",
        })
        .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body.message).to.contain('Failed to validate token')
        done()
      })
    })
  
    it('should failed without startTime', (done) => {
      chai.request(app)
        .post('/api/task/add')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
          eventTask:"test task",
        })
        .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body.message).to.contain('Validation failed')
        done()
      })
    })
  
    it('should failed without event', (done) => {
      chai.request(app)
        .post('/api/task/add')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
          startTime:"2020-03-03 17:00:00"
        })
        .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body.message).to.contain('Validation failed')
        done()
      })
    })
  
    it('success to Add task', (done) => {
      chai.request(app)
        .post('/api/task/add')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
          startTime:"2020-03-03 17:00:00",
          eventTask:"test task",
          location:"test"
        })
        .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res.body.message).to.contain('Success to create task')
        done()
      })
    })
  })

  describe('Task Routes List', () => {
    it('should failed without token', (done) => {
      chai.request(app)
        .get('/api/task/list')
        .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body.message).to.contain('Validation failed')
        done()
      })
    })

    it('should failed with failed token', (done) => {
      chai.request(app)
        .get('/api/task/list')
        .set({ "Authorization": "test" })
        .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body.message).to.contain('Token not provided')
        done()
      })
    })

    it('should failed with wrong token', (done) => {
      chai.request(app)
        .get('/api/task/list')
        .set({ "Authorization": "Bearer test" })
        .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body.message).to.contain('Failed to validate token')
        done()
      })
    })

    it('success list all', (done) => {
      chai.request(app)
        .get('/api/task/list')
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.message).to.contain('Success')
        done()
      })
    })
  
    it('success list by time', (done) => {
      chai.request(app)
        .get('/api/task/list')
        .query({
          startTime: "2020-03-03 17:00:00"
        })
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.message).to.contain('Success')
        done()
      })
    })

    it('success list by location', (done) => {
      chai.request(app)
        .get('/api/task/list')
        .query({
          location: "test"
        })
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.message).to.contain('Success')
        done()
      })
    })
  })
})

