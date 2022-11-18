import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  GoogleSigninButtonDirective,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private cookies: CookieService,
    private api: ApiService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(this.#handleAuthState.bind(this));
  }

  loginWithFacebook() {
    from(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)).subscribe((user)=>{
      console.log(user)
      this.api.loginWithFacebook(user.authToken).subscribe(console.log)
    })
  }

  #handleAuthState(user: SocialUser) {
    if (user.provider == 'GOOGLE') {
      this.api.loginWithGoogle(user.idToken).subscribe(this.#handleGoogleLogin.bind(this));
      return;
    }

    // TODO: handle others
  }

  #handleGoogleLogin(res: { token: string }) {
    this.cookies.set('access_token', res.token);
    this.router.navigate(['/somewhere'], {replaceUrl: true});
  }

  
}
