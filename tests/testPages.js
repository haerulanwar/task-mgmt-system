const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

describe('Route Index', () => {
  it('should render the index view with title', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res).to.have.header('content-type', 'text/html; charset=utf-8')
      expect(res.text).to.contain('Express')
      done()
    })
  })

  it('should render the error view', (done) => {
    chai.request(app)
      .get('/about')
      .end((err, res) => {
      expect(res).to.have.status(404)
      expect(res).to.have.header('content-type', 'text/html; charset=utf-8')
      expect(res.text).to.contain('Not Found')
      done()
    })
  })
})