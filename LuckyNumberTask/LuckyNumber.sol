// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract LuckyNumber {
  address public manager;
  mapping(uint16 => address payable[]) public players;

  constructor() {
    manager = msg.sender;
  }

  function enter(uint16 luckyNumber) payable public {
    //TODO: A player picks a lucky Number between 1 and 1000 to enter the lottery.
  }

  function pickLuckyNumber() private view returns (uint16){
    // TODO: Return a random lucky Number between 1 and 1000
  }

  function ejectPlayers() public restricted{
    // TODO: Eject all Players.
  }

  function lookUpPlayers(uint16 luckyNumber) public view returns(address payable[] memory) {
    // TODO: Look up all players, who entered the Lottery with the given number.
  }

  function pickWinners() public restricted{
    // TODO: Pick a random lucky Number to determine the Lottery Winner.
    // No one wins: No one gets money, eject all players.
    // At least one person wins: Divide the price pool equally.
  }

  modifier restricted() {
    // TODO: Make sure, that only the manager can call functions with this modifier.
  }

}
