import { Component, OnInit } from '@angular/core';
import {LotteryService} from "../services/lottery.service";
import {LuckyNumberService} from "../services/lucky-number.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public lnoPlayers: String[] = [];
  public lotteryPlayers: String[] = [];

  getPlayerForm = new FormGroup({
    lnoNumberSelector: new FormControl('', [Validators.required]),
  })

  constructor(private lotteryService: LotteryService, private luckyNumberService: LuckyNumberService) {}

  ngOnInit(): void {}

  async chooseLnoWinner()
  {
    await this.luckyNumberService.pickWinners();
  }

  async chooseLotteryWinner()
  {
    await this.lotteryService.pickWinner();
  }

  async getLnoPlayers()
  {
    this.lnoPlayers = await this.luckyNumberService.getPlayers(this.getPlayerForm.value.lnoNumberSelector);
  }

  async getLotteryPlayers()
  {
    this.lotteryPlayers = await this.lotteryService.getPlayers();
  }
}
