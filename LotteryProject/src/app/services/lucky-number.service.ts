declare let window: any
import {ethers} from "ethers";
import {Injectable} from "@angular/core";
import addresses from '../../../../environment/contract-address.json'
import LuckyNumber from '../../../../blockchain/artifacts/blockchain/contracts/LuckyNumber.sol/LuckyNumber.json'

@Injectable({providedIn: "root"})
export class LuckyNumberService {

  accessionValue = '0.1'

  // a provider can interact with the blockchain - a user
  // a signer is an actual address - of the user
  public signer: any;

  public luckyNumberContract: any;

  constructor() {
    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    provider.on("network", (newNetwork: any, oldNetwork: any) =>{
      if(oldNetwork){
        window.location.reload();
      }
    });
    this.signer = provider.getSigner();
    this.luckyNumberContract = new ethers.Contract(addresses.luckyNumberAddress,LuckyNumber.abi,this.signer)
  }

  async getManager() {
    return await this.luckyNumberContract.manager();
  }

  async getPlayer(key: number, position: number) {
    return await this.luckyNumberContract.players(key + "", position);
  }

  async getPlayers(key: number) {
    return await this.luckyNumberContract.lookUpPlayers(key);
  }

  async enter(luckyNumber: number) {
    const tx = await this.luckyNumberContract.enter(
      luckyNumber,
      {
      value: ethers.utils.parseEther(this.accessionValue)
      });
    await tx.wait();
    console.log('transaction finished')
  }

  async pickWinners(){
    return await this.luckyNumberContract.pickWinners({
      gasLimit:100000
    });
  }

}
