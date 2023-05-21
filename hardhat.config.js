require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')

const dotenv = require('dotenv')

dotenv.config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    mumbai:{
      url: process.env.POLYGON_RPC_MUMBAI,
      accounts:[process.env.POLYGON_PRIVATE_KEY]
    }
  },etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
