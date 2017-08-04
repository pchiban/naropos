import { AuthenticationUtils } from './authentication.utils.';
import { Role } from './../shared/refdata/role.model';
import { User } from 'app/user/user.model';
import { AppSettings } from './../shared/settings/app.settings';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(username: string, password: string) {
    let body = JSON.stringify({ userName: username, password: password });

    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');

    return this.http.post(AppSettings.API_ENDPOINT + '/authenticate', body, options)
      .map((response) => {
        // login successful if there's a jwt token in the response
        let body = response.json();
        if (body && body.token) {
          let roles: Role[] = [];
          for (let i = 0; i < body.roleList.length; i++) {
            roles.push(new Role(null, body.roleList[i]));
          }
          let user = new User(body.userId, body.userName, null, null, roles);

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('currentUserToken', body.token);
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserToken');
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
  }
}
