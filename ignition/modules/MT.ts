const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("LiquidityPool", (m:any) => {
  const token = m.contract("LiquidityPoolWithInterest");

  return { token };
});

module.exports = TokenModule;
