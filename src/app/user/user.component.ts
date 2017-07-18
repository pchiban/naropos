import { User } from './user.model';
import { UserService } from './user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  // vars
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    // populate user list
    this.users = this.userService.getUsers();
  }

  ngOnDestroy(){
  }

  editUser(user: User) {
    this.userService.selectedUser.next(user);
  }

  removeUser(user: User) {

  }
}
