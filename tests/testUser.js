const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { user } = require('../models')
const config = require('../config/config.json')
const { encodePassword } = require('../utils/cryptoUtil')

chai.use(chaiHttp)

describe('User Routes SignUp', () => {
  before((done) => {
    user.destroy({
      where: {
        username: 'test'
      }
    }).then(() => {
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

  it('should failed without username', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        password:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('should failed without password', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('success to SignUp', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"test",
        password:"test"
      })
      .end((err, res) => {
      expect(res).to.have.status(201)
      expect(res.body.message).to.contain('Success to register')
      done()
    })
  })

  it('should failed username already used', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"test",
        password:"test"
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation error')
      done()
    })
  })
})

describe('User Routes SignIn', () => {
  before((done) => {
    const password = "test"
    const secKey = Buffer.from(config.secret, 'base64').toString('utf8')
    const encPassword = encodePassword(password, secKey)

    user.create({
      username: 'test',
      password: encPassword
    }).then(() => {
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

  it('should failed without username', (done) => {
    chai.request(app)
      .post('/api/user/signin')
      .send({
        password:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('should failed without password', (done) => {
    chai.request(app)
      .post('/api/user/signin')
      .send({
        username:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('should failed user not found', (done) => {
    chai.request(app)
      .post('/api/user/signin')
      .send({
        username:"notfound",
        password:"test"
      })
      .end((err, res) => {
      expect(res).to.have.status(404)
      expect(res.body.message).to.contain('User not found')
      done()
    })
  })

  it('should failed password not match', (done) => {
    chai.request(app)
      .post('/api/user/signin')
      .send({
        username:"test",
        password:"wrongpass"
      })
      .end((err, res) => {
      expect(res).to.have.status(401)
      expect(res.body.message).to.contain('Incorrect password')
      done()
    })
  })

  it('success to SignIn', (done) => {
    chai.request(app)
      .post('/api/user/signin')
      .send({
        username:"test",
        password:"test"
      })
      .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body.message).to.contain('Success to login')
      done()
    })
  })
})

describe('User Routes SignOut', () => {

  it('Success to logout', (done) => {
    chai.request(app)
      .post('/api/user/signout')
      .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body.message).to.contain('Success to logout')
      done()
    })
  })
})