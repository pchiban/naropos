import { AlertService } from '../shared/alert/alert.service';
import { Subscription } from 'rxjs/Rx';
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

  // subscriptions
  loadUsersSubscription: Subscription;
  deleteUserSubscription: Subscription;
  onSaveUserSusbscription: Subscription;
  userSavedSubscription: Subscription;

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    // populate user list
    this.loadUsers();

    // save user
    this.onSaveUserSusbscription = this.userService.onSaveUser.subscribe(user => {
      this.saveUser(user);
    });
  }

  ngOnDestroy() {
    if (this.loadUsersSubscription && this.loadUsersSubscription !== null)
      this.loadUsersSubscription.unsubscribe();

    if (this.deleteUserSubscription && this.deleteUserSubscription !== null)
      this.deleteUserSubscription.unsubscribe();

    if (this.onSaveUserSusbscription && this.onSaveUserSusbscription !== null)
      this.onSaveUserSusbscription.unsubscribe();

    if (this.userSavedSubscription && this.userSavedSubscription !== null)
      this.userSavedSubscription.unsubscribe();
  }

  editUser(user: User) {
    this.userService.selectedUser.next(user);
  }

  saveUser(user: User) {
    this.userSavedSubscription = this.userService.saveUser(user).subscribe(user => {
      // saved
      this.alertService.success('User saved successfully');
      this.loadUsers();
    }, err => {
      this.alertService.error('Error saving user');
    });
  }

  removeUser(user: User) {

  }

  loadUsers() {
    this.loadUsersSubscription = this.userService.getUsers().subscribe(list => {
      this.users = list;
    });
  }
}
