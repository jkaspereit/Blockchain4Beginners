const { expect } = require("chai");
const {BigNumber} = require("ethers");

describe("LuckyNumber", () => {
  let contract, manager, address1, address2;
  let addresses;
  const fees = ethers.utils.parseEther("0.1")
  const gasCosts = ethers.utils.parseEther("1")
  const luckyNumber = "111";
  beforeEach(async ()=>{
    const blueprint = await ethers.getContractFactory("LuckyNumber");
    contract = await blueprint.deploy();
    await contract.deployed();
    [manager, address1, address2, ...addresses] = await ethers.getSigners();
  });
  it("should create the contract", ()=>{
    expect(contract).to.exist
  });
  it("should have addresses", ()=>{
    expect(manager).to.exist
    expect(address1).to.exist
    expect(address2).to.exist
  });
  it("should enter", async ()=>{
    await contract.connect(address1).enter(luckyNumber, {value: fees})
    let contractAddress = await contract.connect(address1).players(luckyNumber,0);
    expect(contractAddress).to.equal(address1.address)
  });
  it("should enter twice", async ()=>{
    await contract.connect(address1).enter(luckyNumber, {value: fees})
    await contract.connect(address2).enter(luckyNumber, {value: fees})
    let contractAddresses = await contract.connect(manager).lookUpPlayers(luckyNumber);
    expect(contractAddresses).to.contains(address1.address,address2.address)
  });
  it("shouldn't enter, not enough ether", async ()=>{
    try {
      await contract.connect(address1).enter(luckyNumber)
      expect(false)
    } catch (error) {
      expect(error.message).to.include("Must enter with 0.01 MATIC.")
    }
  });
  it("shouldn't enter, invalid lucky number", async ()=>{
    try {
      await contract.connect(address1).enter("0",{value: fees})
      expect(false)
    } catch (error) {
      expect(error.message).to.include("Must specify a lucky number between 1 and 999.")
    }
  });
  it("should pick winners and transfer jackpot", async ()=>{
    await new Promise(function(resolve, reject) {
      for (let i = 1; i < 999; i++) {
        contract.connect(address1).enter(i + "",{value: fees});
        contract.connect(address2).enter(i + "",{value: fees});
      }
      setTimeout(() => resolve("done!"), 1000);
    }).then(async (result) => {
      let initialBalance1 = await address1.getBalance();
      let initialBalance2 = await address2.getBalance();
      await contract.connect(manager).pickWinners();
      let finalBalance1 = await address1.getBalance();
      let finalBalance2 = await address2.getBalance();
      let dif1 = finalBalance1.sub(initialBalance1);
      let dif2 = finalBalance2.sub(initialBalance2);
      let jackpot = BigNumber.from(fees).mul(BigNumber.from(998));
      expect(dif1).eq(jackpot);
      expect(dif2).eq(jackpot);
      for (let i = 1; i < 1000; i++) {
        let playersAtIndex = await contract.connect(manager).lookUpPlayers(luckyNumber);
        expect(playersAtIndex).to.be.empty
      }
    });
  });
  it("shouldn't pick a winner, restricted access",async ()=>{
    try {
      await contract.connect(address1).pickWinners();
      expect(false)
    } catch (error) {
      expect(error.message).to.include("Only the manager can execute this function.")
    }
  });
  it("shouldn't eject players, restricted access", async ()=>{
    try {
      await contract.connect(address1).ejectPlayers();
      expect(false)
    } catch (error) {
      expect(error.message).to.include("Only the manager can execute this function.")
    }
  });
})
