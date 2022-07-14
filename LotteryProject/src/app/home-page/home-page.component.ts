import { Component } from '@angular/core';
import {LotteryService} from "../services/lottery.service";
import {Router} from "@angular/router";
import {AuthService} from "../login/auth.service";
declare let window: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  manager = ''

  constructor(private lotteryService: LotteryService, private authService: AuthService,
              private router: Router) {
  }

  async showManager() {
    console.log(await  this.lotteryService.getManager())
  }

  async showPlayers() {
    console.log(await  this.lotteryService.getPlayers())
  }

  async enter() {
    console.log(await  this.lotteryService.enter())
  }

  async pickWinner() {
    console.log(await  this.lotteryService.pickWinner())
  }

  async navigate(target: string) {
    await this.router.navigate([target])
  }

  userIsManager()
  {
    return true;
    if (this.authService.address == null) {
      return false;
    }
    // this.lotteryService.getManager() freezes the page for some reason...
    return this.authService.address == this.lotteryService.getManager();
  }
}
