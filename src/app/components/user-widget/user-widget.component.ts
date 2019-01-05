import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.css']
})
export class UserWidgetComponent implements OnInit, OnDestroy {
  userName: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService
      .loggedUser().pipe(untilDestroyed(this))
      .subscribe(user => {
        this.userName = user ? user.name : null;
      });
  }

  ngOnDestroy() { }

  logOut() {
    this.loginService
      .logOut().pipe(untilDestroyed(this))
      .subscribe(() => {
        this.userName = null;
        this.router.navigate(['/login']);
      });
  }
}
