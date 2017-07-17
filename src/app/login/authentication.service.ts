import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(username: string, password: string) {
    let body = JSON.stringify({ userName: username, password: password });

    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');

    return this.http.post('http://naropos-naro.rhcloud.com/api/authenticate', body, options)
      .map((response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
  }

}
