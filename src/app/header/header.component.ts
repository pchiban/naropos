import { AuthenticationService } from './../login/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
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
}
