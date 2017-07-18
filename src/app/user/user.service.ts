import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  selectedUser = new Subject<User>();

  private users: User[] = [
    new User(1, "test 1", true),
    new User(2, "test 2", true),
    new User(3, "test 3", false),
    new User(4, "test 4", false),
    new User(5, "test 5", true),
    new User(6, "test 6", false)
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }

}
