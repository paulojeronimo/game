const random = (min, max) => Math.floor(min + max * Math.random())

module.exports = {
  random,
  rollTheDice: () => random(1, 6)
}
