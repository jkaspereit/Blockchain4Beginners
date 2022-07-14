import { Component } from '@angular/core';
import {LuckyNumberService} from "../services/lucky-number.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-lucky-number',
  templateUrl: './lucky-number.component.html',
  styleUrls: ['./lucky-number.component.scss']
})

export class LuckyNumberComponent  {

  getEnterForm = new FormGroup({
    luckyNumber: new FormControl('', [Validators.required, createNumberValidator()]),
  })

  constructor(private luckyNumberService: LuckyNumberService) { }

  async enter() {
    await this.luckyNumberService.enter(this.getEnterForm.value.luckyNumber);
  }
}

export function createNumberValidator(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    try {
      const number = BigInt(value);
      if (number > 999) {
        return {numTooLarge: true};
      }
    } catch (e) {
      return {notNumber: true};
    }
    return null;
  }
}
