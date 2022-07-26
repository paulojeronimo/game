const supertest = require('supertest')
const app = require('./index')

const isSorted = (arr) =>
  !!arr.reduce((n, item) => n !== false && item >= n && item)

describe('GET /', () => {
  it('responds with a valid json', async () => {
    const response = await supertest(app)
      .get('/')
      .set('Accept', 'application/json')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)

    // check if the number of rounds was defined and it is numeric
    expect(typeof response.body.rounds).toBe('number')

    const playersBalances = response.body.playersBalances

    // check if we have four players
    expect(playersBalances).toBeDefined()
    expect(playersBalances.length).toBe(4)

    // create an array with balances and check if it is Sorted
    const balances = playersBalances.map(o => Object.values(o)[0]).reverse()
    expect(isSorted(balances)).toBe(true)
  })
})
