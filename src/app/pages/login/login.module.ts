import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { LoginPageComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { InputErrorComponent } from '../../components/input-error';

import { LoginRoutingModule } from './login.routing';

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [LoginPageComponent, LoginFormComponent, InputErrorComponent]
})
export class LoginModule {}
