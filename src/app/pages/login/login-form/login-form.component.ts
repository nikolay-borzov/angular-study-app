import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { LoginService } from '../../../services/login.service';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output() loading = new EventEmitter<boolean>();
  @Output() loggedIn = new EventEmitter();

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

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.startLoading();

    this.loginService
      .loggedUser()
      .pipe(finalize(this.stopLoading), untilDestroyed(this))
      .subscribe(user => {
        this.loggedAs = user;
      });
  }

  ngOnDestroy() { }

  private resetModel() {
    this.model.login = '';
    this.model.password = '';
  }

  private onSuccess = () => this.loggedIn.emit(this.loginService.redirectUrl);

  private onError = errors => {
    if (errors.wrongLoginPassword) {
      this.errorMessage = 'Wrong login or password.';
      this.model.password = '';
    } else {
      this.errorMessage = 'Cannot sign in. Unknown error occurred.';
    }
  };

  private startLoading = () => this.loading.emit(true);
  private stopLoading = () => this.loading.emit(false);

  onSubmit() {
    this.startLoading();

    this.loginService
      .logIn(this.model.login, this.model.password)
      .pipe(finalize(this.stopLoading), untilDestroyed(this))
      .subscribe(this.onSuccess, this.onError);
  }

  logOut() {
    this.startLoading();

    this.loginService
      .logOut()
      .pipe(finalize(this.stopLoading), untilDestroyed(this))
      .subscribe(() => {
        this.resetModel();
        this.loggedAs = null;
      });
  }
}
