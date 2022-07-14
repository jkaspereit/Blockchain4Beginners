import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isAuthenticating = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  async login() {
    await this.authService.openMetamask().then(resp =>{
      console.log(resp)
    })
    this.router.navigate(['home'])
  }

}
