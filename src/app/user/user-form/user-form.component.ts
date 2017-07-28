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

  // subscription
  selectedUserSubscription: Subscription;

  constructor(private userService: UserService) { }

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
    });
  }

  ngOnDestroy() {
    if (this.selectedUserSubscription !== null)
      this.selectedUserSubscription.unsubscribe();
  }

  saveUser() {
    let user = new User(this.userId, this.userForm.get('userName').value, this.userForm.get('userActive').value);
    this.userService.onSaveUser.next(user);
    this.doCancel();
  }

  doCancel() {
    this.userForm.reset();
  }
}
