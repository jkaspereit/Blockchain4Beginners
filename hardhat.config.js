require("@nomiclabs/hardhat-waffle");
const secret = require("./environment/secrets.json")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts"
  },
  defaultNetwork: "testnet",
  networks: {
    hardhat: {
      forking: {
        url: "https://ropsten.infura.io/v3/db8c2281c9384ffa918e3441743c8d58"
      }
    },
    testnet: {
      url: "https://ropsten.infura.io/v3/db8c2281c9384ffa918e3441743c8d58",
      accounts: [secret.pirvatekey]
    }
  }
};
