require("@nomicfoundation/hardhat-toolbox");
// import dotenv from "dotenv"
const dotenv=require('dotenv')
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia:{
      url:process.env.sepolia_url,
      accounts:[process.env.pvt_key]
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};