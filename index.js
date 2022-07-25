const express = require('express')
const app = express()

const result = {
  "rounds": 1000,
  "playersBalances": [
    { "cautious": 100 },
    { "random": 80 },
    { "demanding": 40 },
    { "impulsive": 30 }
  ]
}

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(result))
})

app.listen(8080)
