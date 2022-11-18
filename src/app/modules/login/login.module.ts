import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from "./login-routing.module";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { ApiService } from 'src/app/services/api.service';



@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SocialLoginModule
  ]
})
export class LoginModule { }
