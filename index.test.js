const supertest = require('supertest')
const app = require('./index')

test('GET /', async () => {
  const response = await supertest(app).get('/')

  expect(response.statusCode).toEqual(200)
  expect(response.body.rounds).toEqual(1000)
})
