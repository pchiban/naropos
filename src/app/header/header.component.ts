import { AuthenticationUtils } from './../login/authentication.utils.';
import { LoginActivate } from './../login/login-activate';
import { User } from '../user/user.model';
import { AuthenticationService } from './../login/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticationUtils: AuthenticationUtils = AuthenticationUtils;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  isUserLogged() {
    return this.authenticationService.isLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  getUserName() {
    let user = AuthenticationUtils.getLoggedUser();
    return user.name;
  }
}
