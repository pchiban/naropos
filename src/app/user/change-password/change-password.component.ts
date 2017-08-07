import { AlertService } from './../../shared/alert/alert.service';
import { Subscription } from 'rxjs/Rx';
import { User } from './../user.model';
import { AuthenticationUtils } from './../../login/authentication.utils.';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  changePasswordForm: FormGroup;

  // subscription
  onSaveUserSubscription: Subscription;

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      'password': new FormControl(null, Validators.required),
      'repeatPassword': new FormControl(null)
    });
  }

  ngOnDestroy() {
    if (this.onSaveUserSubscription) {
      this.onSaveUserSubscription.unsubscribe();
    }
  }

  changePassword() {
    let loggedUser = AuthenticationUtils.getLoggedUser();
    let password = this.changePasswordForm.get('password').value;
    let user = new User(loggedUser.id, null, password, null, null);

    this.onSaveUserSubscription = this.userService.saveUser(user).subscribe(() => {
      this.alertService.success('Password successfully changed');
      this.changePasswordForm.reset();
    });
  }
}
