import { Role } from './../../shared/refdata/role.model';
import { RefdataService } from './../../shared/refdata/refdata.service';
import { User } from './../user.model';
import { UserService } from './../user.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  // form
  userId: Number = null;
  userForm: FormGroup;

  // roles
  availableRoles: Role[] = [];
  addedRoles: Role[] = [];

  // subscription
  selectedUserSubscription: Subscription;
  loadRolesSubscription: Subscription;

  constructor(
    private userService: UserService,
    private refdataService: RefdataService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userActive: new FormControl(null)
    });

    // selected User
    this.selectedUserSubscription = this.userService.selectedUser.subscribe((user: User) => {
      this.userId = user.id;
      this.userForm.patchValue({
        'userName': user.userName,
        'userActive': user.active
      });

      // roles
      this.availableRoles = [];
      this.addedRoles = [];
      this.loadRolesSubscription = this.refdataService.getRoleList().subscribe(resp => {
        let body: Object[] = resp.json();
        for (let i = 0; i < body.length; i++) {
          this.availableRoles.push(Role.fromJSON(JSON.stringify(body[i])));
        }

        for (let i = 0; i < user.roles.length; i++) {
          this.addRole(user.roles[i]);
        }
      });
    });

    // refdata
    this.loadRoles();
  }

  ngOnDestroy() {
    if (this.selectedUserSubscription && this.selectedUserSubscription !== null) {
      this.selectedUserSubscription.unsubscribe();
    }

    if (this.loadRolesSubscription && this.loadRolesSubscription !== null) {
      this.loadRolesSubscription.unsubscribe();
    }
  }

  saveUser() {
    let user = new User(this.userId, this.userForm.get('userName').value, this.userForm.get('userActive').value, this.addedRoles);
    this.userService.onSaveUser.next(user);
    this.doCancel();
  }

  doCancel() {
    this.userForm.reset();
    this.addedRoles = [];
    this.loadRoles();
  }

  addRole(role: Role) {
    let index = this.availableRoles.indexOf(role);
    this.availableRoles.splice(index, 1);
    this.addedRoles.push(role);
  }

  removeRole(role: Role) {
    let index = this.addedRoles.indexOf(role);
    this.addedRoles.splice(index, 1);
    this.availableRoles.push(role);
  }

  loadRoles() {
    this.availableRoles = [];
    this.loadRolesSubscription = this.refdataService.getRoleList().subscribe(resp => {
      let body: Object[] = resp.json();
      for (let i = 0; i < body.length; i++) {
        this.availableRoles.push(Role.fromJSON(JSON.stringify(body[i])));
      }
    });
  }
}
