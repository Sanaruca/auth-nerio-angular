import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Route[] = [
  {
    path: '',
    component: LoginPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
