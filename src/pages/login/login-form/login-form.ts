import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { TakeUntilDestroy, OnDestroy } from 'ngx-take-until-destroy';

import { LoginService } from '../../../app/services/login.service';
import { User } from '../../../app/entities/user';

@TakeUntilDestroy()
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output() onLoading = new EventEmitter<boolean>();
  @Output() onLogIn = new EventEmitter();

  readonly destroyed$: Observable<boolean>;

  model = {
    login: '',
    password: ''
  };

  validation = {
    login: {
      pattern: '[a-zA-Z]*'
    },
    password: {
      pattern: '[a-zA-Z\\d]*'
    }
  };

  loggedAs: User = null;

  errorMessage = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.startLoading();

    this.loginService
      .getLoggedUser()
      .finally(this.stopLoading)
      .takeUntil(this.destroyed$)
      .subscribe(user => {
        this.loggedAs = user;
      });
  }

  ngOnDestroy() {}

  private onSuccess = user => this.onLogIn.emit();

  private onError = errors => {
    if (errors.wrongLoginPassword) {
      this.errorMessage = 'Wrong login or password.';
      this.model.password = '';
    } else {
      this.errorMessage = 'Cannot sign in. Unknown error occurred.';
    }
  };

  private startLoading = () => this.onLoading.emit(true);
  private stopLoading = () => this.onLoading.emit(false);

  onSubmit() {
    this.startLoading();

    this.loginService
      .logIn(this.model.login, this.model.password)
      .finally(this.stopLoading)
      .takeUntil(this.destroyed$)
      .subscribe(this.onSuccess, this.onError);
  }

  logOut() {
    this.startLoading();

    this.loginService
      .logOut()
      .finally(this.stopLoading)
      .takeUntil(this.destroyed$)
      .subscribe(() => {
        this.loggedAs = null;
      });
  }
}
