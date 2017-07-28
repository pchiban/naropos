import { Response } from '_debugger';
import { HttpService } from '../shared/http/http.service';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  selectedUser = new Subject<User>();
  onSaveUser = new Subject<User>();

  constructor(private httpService: HttpService) { }

  getUsers() {
    return this.httpService.get('/user').map(response => {
      var users: object[] = response.json();
      var userList: User[] = [];
      for (let i = 0; i < users.length; i++) {
        userList.push(User.fromJSON(JSON.stringify(users[i])));
      }

      return userList;
    });
  }

  saveUser(user: User) {
    let bodyJson = JSON.stringify(user);

    if (user.id !== null) {
      // update
      return this.httpService.put('/user', bodyJson);
    } else {
      // insert
      return this.httpService.post('/user', bodyJson);
    }
  }

  removeUser(user: User) {
    return this.httpService.delete('/user/' + user.id);
  }
}
