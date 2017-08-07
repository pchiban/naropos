import { Role } from './../../shared/refdata/role.model';
import { RefdataService } from './../../shared/refdata/refdata.service';
import { User } from './../user.model';
import { UserService } from './../user.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  dbRoles: Role[] = [];
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
      userActive: new FormControl(null),
      password: new FormControl(null, this.passwordValidator.bind(this)),
      repeatPassword: new FormControl(null)
    });

    // selected User
    this.selectedUserSubscription = this.userService.selectedUser.subscribe((user: User) => {
      this.userId = user.id;
      this.userForm.patchValue({
        'userName': user.userName,
        'userActive': user.active
      });

      // roles
      this.availableRoles = this.dbRoles.slice();
      this.addedRoles = [];
      for (let i = 0; i < user.roles.length; i++) {
        this.addRole(user.roles[i]);
      }
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
    let user = new User(
      this.userId,
      this.userForm.get('userName').value,
      this.userForm.get('password').value,
      this.userForm.get('userActive').value,
      this.addedRoles);

    this.userService.onSaveUser.next(user);
    this.doCancel();
  }

  doCancel() {
    this.userId = null;
    this.userForm.reset();
    this.addedRoles = [];
    this.loadRoles();
  }

  addRole(role: Role) {
    let r = this.availableRoles.find(el => el.id === role.id);
    let index = this.availableRoles.indexOf(r);
    this.availableRoles.splice(index, 1);
    this.addedRoles.push(role);
  }

  removeRole(role: Role) {
    let index = this.addedRoles.indexOf(role);
    this.addedRoles.splice(index, 1);
    this.availableRoles.push(role);
  }

  loadRoles() {
    // check if DB roles is populated
    if (this.dbRoles.length === 0) {
      this.loadRolesSubscription = this.refdataService.getRoleList().subscribe(resp => {
        let body: Object[] = resp.json();
        for (let i = 0; i < body.length; i++) {
          this.dbRoles.push(Role.fromJSON(JSON.stringify(body[i])));
        }

        this.availableRoles = this.dbRoles.slice();
      });
    }

    this.availableRoles = this.dbRoles.slice();
  }

  passwordValidator(control: FormControl): ValidationErrors {
    let value = control.value;

    // required only for create
    if (this.userId === null) {
      if (!value || value === '') {
        return { 'required': true };
      }
    }

    return null;
  }

  isFormValid() {
    let isValid = this.userForm.get('userName').valid && this.addedRoles && this.addedRoles.length > 0;

    // custom validations
    if (this.userId === null) {
      // add password validations
      isValid = isValid && this.userForm.get('password').valid && this.userForm.get('repeatPassword').valid;
    }

    return isValid;
  }
}
