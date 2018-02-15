import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  showLoading(show: boolean) {
    if (show) {
      // TODO: Add loading indicator
    } else {
      // TODO: Hide loading indicator
    }
  }

  goToCoursesPage(redirectToUrl: string) {
    this.router.navigate([redirectToUrl || '/']);
  }
}
