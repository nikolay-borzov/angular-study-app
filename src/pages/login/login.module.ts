import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import { LoginFormComponent } from './login-form/login-form';
import { InputNoteComponent, InputErrorComponent } from '../../components';

import { LoginService } from '../../app/services/login.service';

@NgModule({
  imports: [IonicPageModule.forChild(LoginPage)],
  declarations: [
    LoginPage,
    LoginFormComponent,
    InputNoteComponent,
    InputErrorComponent
  ],
  providers: [LoginService]
})
export class LoginPageModule {}
