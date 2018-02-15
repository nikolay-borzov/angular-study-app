import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth-guard.service';
import { LoginService } from '../../services/login.service';

import { LoginPageComponent } from './login.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Sign in' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  providers: [AuthGuard, LoginService]
})
export class LoginRoutingModule {}
