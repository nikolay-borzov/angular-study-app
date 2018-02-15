import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TakeUntilDestroy, OnDestroy } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../../services/login.service';
import { User } from '../../entities/user';

@TakeUntilDestroy()
@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.css']
})
export class UserWidgetComponent implements OnInit, OnDestroy {
  readonly destroyed$: Observable<boolean>;

  userName: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService
      .loggedUser()
      .takeUntil(this.destroyed$)
      .subscribe(user => {
        this.userName = user ? user.name : null;
      });
  }

  ngOnDestroy() {}

  logOut() {
    this.loginService
      .logOut()
      .takeUntil(this.destroyed$)
      .subscribe(() => {
        this.userName = null;
        this.router.navigate(['/login']);
      });
  }
}
