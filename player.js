const utils = require('./utils')

class Player {
  static players = []

  static setOpeningBalance(openingBalance) {
    Player.openingBalance = openingBalance
    return Player
  }

  static createNew(player) {
    Player.players.push(player)
    player._index = Player.players.length - 1
    return Player
  }

  static getPlayers() {
    return Player.players
  }

  constructor(name) {
    this._name = name
    this._position = 0
    this._balance = Player.openingBalance
    this._rounds = 0
    this._laps = 0
  }

  get name() {
    return this._name
  }

  get index() {
    return this._index
  }

  set position(newPosition) {
    this._position = newPosition
  }

  get position() {
    return this._position
  }

  set balance(newBalance) {
    this._balance = newBalance
  }

  get balance() {
    return this._balance
  }

  set rounds(newRounds) {
    this._rounds = newRounds
  }

  get rounds() {
    return this._rounds
  }

  set laps(newLaps) {
    this._laps = newLaps
  }

  get laps() {
    return this._laps
  }

  rollTheDice() {
    const positions = utils.rollTheDice()
    this.rounds += 1
    return positions
  }

  isOutOfTheGame() {
    return this.balance <= 0
  }

  buyOrRentRule(p) {
    throw new Error('buyOrRentRule called directly from Player')
  }

  buyOrRent(p) {
    //if (buyOrRentRule(p)) {
      //console.log('TODO: refactor code from function "modes.js/byOrRent" here')
    //}
  }
}

class CautiousPlayer extends Player {
  constructor() {
    super('cautious')
  }

  buyOrRentRule(p) {
    return this._balance >= 80
  }
}

class RandomerPlayer extends Player {
  constructor() {
    super('randomer')
  }

  buyOrRentRule(p) {
    return random(0, 1) === 0
  }
}

class DemandingPlayer extends Player {
  constructor() {
    super('demanding')
  }

  buyOrRentRule(p) {
    return p?.rentValue > 50
  }
}

class ImpulsivePlayer extends Player {
  constructor() {
    super('impulsive')
  }

  buyOrRentRule(p) {
    return true
  }
}

module.exports = {
  Player,
  CautiousPlayer,
  RandomerPlayer,
  DemandingPlayer,
  ImpulsivePlayer
}
