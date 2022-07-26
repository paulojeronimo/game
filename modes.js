const { PROPERTIES, AWARD_BY_LAP, players } = require("./constants");
const { random } = require("./utils");

const showPositionAndMove = (player, positions, newPosition) => {
  console.log(`player "${player.name}" will move ${positions} positions from ${player.position} to ${newPosition}`)
  player.position = newPosition
}

const showLap = (player) => {
  player.laps++
  console.log(`  "${player.name}" completed lap ${player.laps}! position: ${player.position}`)
}

const movePlayer = (playerIndex, positions) => {
  const player = players[playerIndex];
  if (player.position + positions <= PROPERTIES.length - 1) {
    showPositionAndMove(player, positions, player.position + positions)
  } else {
    showPositionAndMove(player, positions, player.position + positions - PROPERTIES.length)
    player.balance += AWARD_BY_LAP
    showLap(player)
  }
  return player.position
}

const buyOrRent = (playerIndex, propertyIndex) => {
  const player = players[playerIndex]
  const property = PROPERTIES[propertyIndex]

  if (property.owner > 0) {
    if ((playerIndex !== property.owner) && (player.balance >= property.rentValue)) {
      const propertyOwner = players[property.owner]
      propertyOwner.balance += property.rentValue
      player.balance -= property.rentValue
      //console.log(`  "${player.name} paid a rent (${property.rentValue}) to "${propertyOwner.name}". Balance: ${player.balance}`)
    }
  } else {
    if (player.balance >= property.saleValue) {
      property.owner = playerIndex
      player.balance -= property.saleValue
      //console.log(`  "${player.name} bought a property (${property.saleValue}). Balance: ${player.balance}`)
    }
  }
  if (player.balance <= 0) {
    //console.log(`Game over for player "${player.name}"!`)
  }
}

module.exports = {
  movePlayer,

  // The cautious player buys any property as long as he has a reserve of 80
  // balance left after the purchase is made.
  cautiousMode: (playerIndex, positions) => {
    const propertyIndex = movePlayer(playerIndex, positions);
    const player = players[playerIndex];
    if (player.balance >= 80) {
      buyOrRent(playerIndex, propertyIndex);
    }
  },

  // The random player buys the property he lands on top of with 50% probability
  randomerMode: (playerIndex, positions) => {
    const propertyIndex = movePlayer(playerIndex, positions);
    if (random(0, 1) === 0) {
      buyOrRent(playerIndex, propertyIndex);
    }
  },

  // The demanding player buys any property as long as its rent is greater than 50
  demandingMode: (playerIndex, positions) => {
    const propertyIndex = movePlayer(playerIndex, positions);
    const property = PROPERTIES[propertyIndex];
    if (property.rentValue > 50) {
      buyOrRent(playerIndex, propertyIndex);
    }
  },

  // The impulsive player buys any property he lands on
  impulsiveMode: (playerIndex, positions) => {
    const propertyIndex = movePlayer(playerIndex, positions);
    buyOrRent(playerIndex, propertyIndex);
  }
}
