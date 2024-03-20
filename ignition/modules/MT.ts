const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
//ERC20#ERC20 - 0x5FbDB2315678afecb367f032d93F642f64180aa3
//AMMLiquidityPool#AMMLiquidityPool - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
//PeerToPeerLending#PeerToPeerLending - 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
const TokenModule = buildModule("PeerToPeerLending", (m:any) => {
  const token = m.contract("PeerToPeerLending");

  return { token };
});

module.exports = TokenModule;
