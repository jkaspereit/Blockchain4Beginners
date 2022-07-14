import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginGuard} from "./login-guard.service";
import {LuckyNumberComponent} from "./lucky-number/lucky-number.component";

const routes: Routes = [
  {
    path: 'home', component: HomePageComponent, canActivate: [LoginGuard]
  },
  {
    path: 'lucky-number', component: LuckyNumberComponent, canActivate: [LoginGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo:'/home', pathMatch:'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
