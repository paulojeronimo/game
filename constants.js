const { Player, CautiousPlayer, RandomerPlayer, ImpulsivePlayer, DemandingPlayer } = require('./player')
const OPENING_BALANCE = 300

module.exports = {
  OPENING_BALANCE,

  MAX_ROUNDS: 1000,

  AWARD_BY_LAP: 100,

  PROPERTIES: new Array(20).fill({
    owner: -1, salveValue: 0, rentValue: 0
  }),

  players: Player
    .setOpeningBalance(OPENING_BALANCE)
    .createNew(new CautiousPlayer())
    .createNew(new ImpulsivePlayer())
    .createNew(new DemandingPlayer())
    .createNew(new RandomerPlayer())
    .getPlayers()
}
