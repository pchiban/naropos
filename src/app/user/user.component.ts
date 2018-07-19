import { RefdataService } from './../shared/refdata/refdata.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
import { AlertService } from '../shared/alert/alert.service';
import { Subscription } from 'rxjs/Rx';
import { User } from './user.model';
import { UserService } from './user.service';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from '../../../node_modules/ng2-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  // vars
  users: User[];
  shownRolesByUser: boolean[] = [];

  // subscriptions
  loadUsersSubscription: Subscription;
  deleteUserSubscription: Subscription;
  onSaveUserSusbscription: Subscription;
  userSavedSubscription: Subscription;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

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
    this.deleteUserSubscription = this.userService.removeUser(user).subscribe(() => {
      // went fine
      this.alertService.info('User successfully deleted.');
      this.loadUsers();
    }, err => {
      // error
      this.alertService.error(err);
    });
  }

  loadUsers() {
    this.loadUsersSubscription = this.userService.getUsers().subscribe(list => {
      this.users = list;
      for (let i = 0; i < list.length; i++) {
        this.shownRolesByUser[+list[i].id] = false;
      }
    }, (response: Response) => {
      if (response.status === 403) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        this.alertService.error('Session expired. Please log in again.');
      } else {
        this.alertService.error('Error loading Users.');
      }
    });
  }

  getRolesCellClass(userId) {
    let icon = 'glyphicon-chevron-right';

    if (this.shownRolesByUser[userId]) {
      icon = 'glyphicon-chevron-down';
    }

    return 'glyphicon ' + icon;
  }

  showHideRoles(user) {
    let shown = this.shownRolesByUser[user.id];
    this.shownRolesByUser[user.id] = !shown;
  }

  isUserEditable(user: User) {
    if (user.id === 1) {
      return false;
    }

    return true;
  }
}
