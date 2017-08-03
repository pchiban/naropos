import { AuthenticationUtils } from './authentication.utils.';
import { AuthenticationService } from './../login/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from "app/user/user.model";

@Injectable()
export class LoginActivate implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    } else {
      // check user has required role
      let action = route.url[0].path;

      if (AuthenticationUtils.isUserInRole(action)) {
        return true;
      }

      // user does not have any required role
      this.router.navigate(['forbidden']);
    }
  }


}