import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { SignupInfo } from './signup.model';
import { Response } from '../../shared/http/response.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private signupForm: FormGroup;
  private loading: boolean;
  private onEmailSent: Subscription;

  constructor(private router: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private userService: UserService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.loading = false;

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  doCancel() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.loading = true;

    let signupInfo = new SignupInfo();
    signupInfo.email = this.signupForm.get('email').value;

    signupInfo.confirmationUrl = location.origin + "/confirmEmail";

    let singupSubscription = this.userService.signup(signupInfo);
    this.onEmailSent = singupSubscription.subscribe(ok => {
      this.toastr.success('Email successfully sent. Please check your email inbox.', 'Success');
      this.loading = false;
    }, (response) => {
      let resp = Response.fromJSON(response.text());
      let msg : String = resp.messages[0].message;

      this.toastr.error(''+msg, 'Error sending the email');
      this.loading = false;
    });

  }
}
