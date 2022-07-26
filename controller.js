const { restartGame, getPlayersBalances, setPropertiesValuesRandomly } = require("./model");
const { players, PROPERTIES, MAX_ROUNDS } = require("./constants");

const {
  impulsiveMode,
  randomerMode,
  demandingMode,
  cautiousMode,
  movePlayer,
} = require("./modes");

const onlyOnePlayerHasBalance = () =>
  players.filter((p) => p.balance > 0).length === 1

const delay = ms => new Promisse(resolve => setTimeout(resolve, ms))

const nextPlayer = (currentPlayer, rounds) => {
  let nextIndex = currentPlayer === null ? 0 : currentPlayer.index + 1
  let player
  do {
    if (nextIndex > players.length - 1) {
      nextIndex = 0
      rounds++
      console.log(`  round ${rounds} completed!`)
    }
    player = players[nextIndex++]
  } while (player.isOutOfTheGame())
  return { player, rounds }
}

module.exports = {
  simulate: /*async */() => {
    restartGame();
    setPropertiesValuesRandomly();
    let player = null
    let rounds = 0
    let result
    let propertyIndex
    while (rounds < MAX_ROUNDS && !onlyOnePlayerHasBalance(players)) {
      result = nextPlayer(player, rounds)
      player = result.player
      rounds = result.rounds
      const positions = player.rollTheDice();
      //await new Promise(resolve => setTimeout(resolve, 500));
      propertyIndex = movePlayer(player.index, positions)

      // TODO refactor this code:
      eval(`${player.name}Mode`)(player.index, positions)
      // it needs to be better than this (still wrong):
      //player.buyOrRent(PROPERTIES[propertyIndex])
    }
    return {
      rounds,
      playersBalances: getPlayersBalances(),
    };
  },
};
