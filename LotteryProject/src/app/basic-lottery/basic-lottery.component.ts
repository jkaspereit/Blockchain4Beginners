import { Component, OnInit } from '@angular/core';
import {LotteryService} from "../services/lottery.service";

@Component({
  selector: 'app-basic-lottery',
  templateUrl: './basic-lottery.component.html',
  styleUrls: ['./basic-lottery.component.scss']
})
export class BasicLotteryComponent implements OnInit {

  constructor(private lotteryService: LotteryService) { }

  ngOnInit(): void {
  }

  async play() {
    await this.lotteryService.enter();
  }
}
