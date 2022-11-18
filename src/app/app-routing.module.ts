import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessControlGuard } from './guards/access-control.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=> import('./modules/login/login.module').then(m => m.LoginModule),
    canLoad: [AccessControlGuard]
  },
  {
    path: '**',
    redirectTo: "/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
