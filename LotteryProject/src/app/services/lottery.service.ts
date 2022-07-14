declare let window: any
import {ethers} from "ethers";
import {Injectable} from "@angular/core";
import addresses from '../../../../environment/contract-address.json'
import Lottery from '../../../../blockchain/artifacts/blockchain/contracts/Lottery.sol/Lottery.json'

@Injectable({providedIn: "root"})
export class LotteryService {

  accessionValue = '0.1'

  // a provider can interact with the blockchain - a user
  // a signer is an actual address - of the user
  public signer: any;

  public lotteryContract: any;

  constructor() {
    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    provider.on("network", (newNetwork: any, oldNetwork: any) =>{
      if(oldNetwork){
        window.location.reload();
      }
    });
    this.signer = provider.getSigner();
    this.lotteryContract = new ethers.Contract(addresses.lotteryAddress,Lottery.abi,this.signer)
  }

  async getManager() {
    // if(await this.signer.getChainId() !== 80001){
    //   alert("Please Change your network to mumbai testnet.")
    // }
    return await this.lotteryContract.manager();
  }

  async getPlayers() {
    return await this.lotteryContract.getPlayers();
  }

  async enter() {
    const tx = await this.lotteryContract.enter({
      value: ethers.utils.parseEther(this.accessionValue)
    });
    await tx.wait()
    console.log('transaction finished')
  }

  async pickWinner(){
    return await this.lotteryContract.pickWinner();
  }

}
