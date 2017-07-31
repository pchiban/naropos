import { Role } from './role.model';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RefdataService {

  constructor(private httpService: HttpService) { }

  getRoleList() {
    return this.httpService.get('/refdata/roles');
  }
}
