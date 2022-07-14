const fs = require('fs')
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function deployContract(name, ...args) {
    // Deploy the contract.
    const Contract = await hre.ethers.getContractFactory(name);
    const deployedContract = await Contract.deploy(args)
    await deployedContract.deployed();
    console.log(name + " deployed to: " + deployedContract.address);
    // Return the address.
    return deployedContract.address;
}

async function main() {
    let addresses = {
        "greeterAddress": await deployContract("Greeter"),
    }
    let addressesJSON = JSON.stringify(addresses);
    fs.writeFileSync("environment/contract-address.json", addressesJSON)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
