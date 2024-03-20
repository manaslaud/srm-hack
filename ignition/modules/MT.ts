const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("MT", (m:any) => {
  const token = m.contract("MT");

  return { token };
});

module.exports = TokenModule;