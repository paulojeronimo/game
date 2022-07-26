const {
  PROPERTIES,
  players,
  OPENING_BALANCE,
} = require("./constants");

const { random } = require("./utils");

module.exports = {
  restartGame: () => {
    players.map((p) => {
      p.balance = OPENING_BALANCE;
      p.position = 0;
    });
  },
  setPropertiesValuesRandomly: () => {
    PROPERTIES.map((prop) => {
      prop.saleValue = random(1, OPENING_BALANCE / 2);
      prop.rentValue = random(1, OPENING_BALANCE / 4);
    });
  },
  getPlayersBalances: () => players
      .sort((a, b) => b.balance - a.balance)
      .map(p => ({[p.name]: p.balance }))
};
