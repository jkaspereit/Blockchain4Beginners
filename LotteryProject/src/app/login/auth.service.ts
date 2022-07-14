import { Injectable } from '@angular/core';
import Web3 from "web3";

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  web3:any;
  address:any;
  isAuthenticated = false;

  constructor() { }

  private getAccounts = async () => {
    try {
      return await window.ethereum.request({ method: 'eth_accounts' });
    } catch (e) {
      return [];
    }
  }

  public openMetamask = async () => {
    this.web3 = new Web3(window.ethereum);
    let addresses = await this.getAccounts();
    console.log("service",addresses)
    if (!addresses.length) {
      try {
        addresses = await window.ethereum.enable();
      } catch (e) {
        return false;
      }
    }
    this.address = addresses.length ? addresses[0] : null;
    if(this.address != null){
      this.isAuthenticated = true;
    }
    return this.address;
  };

}
