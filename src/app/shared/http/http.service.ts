import { AppSettings } from './../settings/app.settings';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  createAuthorizationHeader(options: RequestOptions) {
    let token = localStorage.getItem('currentUserToken');
    options.headers = new Headers();
    options.headers.append('Authorization', 'Bearer ' + token);
    options.headers.append('Content-Type', 'application/json');
  }

  get(url) {
    let options = new RequestOptions();
    this.createAuthorizationHeader(options);
    return this.http.get(AppSettings.API_ENDPOINT + url, options);
  }

  post(url, data) {
    let options = new RequestOptions();
    this.createAuthorizationHeader(options);
    return this.http.post(AppSettings.API_ENDPOINT + url, data, options);
  }
}
