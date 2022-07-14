import {FormControl, Validators} from "@angular/forms";

declare let window: any
import {Component, OnInit} from '@angular/core';
import { ethers } from 'ethers';
import addresses from '../../../environment/contract-address.json'
import Greeter from '../../../blockchain/artifacts/blockchain/contracts/Greeter.sol/Greeter.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public signer: any;

  public greeterContract: any;

  public output: string = "";

  public input = new FormControl('', [Validators.required])

  public waitOnTx = false;

  async ngOnInit() {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")

    provider.on("network", (newNetwork: any, oldNetwork: any) => {
      if(oldNetwork) {
        window.location.reload();
      }
    });

    this.signer = provider.getSigner();

    // If you aren't using Ropsten Testnet, then change this check and alert to fit to your network.
    if(await this.signer.getChainId() !== 3) {
      alert("Please Change your network to mumbai testnet!")
    }

    this.greeterContract = new ethers.Contract(addresses.greeterAddress, Greeter.abi, this.signer);

    this.output = await this.greeterContract.greet();
  }

  async submit() {
    const setGreetingTx = await this.greeterContract.setGreeting(this.input.value)
    // wait until the transaction is mined
    this.waitOnTx = true
    await setGreetingTx.wait()
    this.waitOnTx = false
    this.output = await this.greeterContract.greet()
  }

}
