import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { SignupInfo } from './signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private signupForm: FormGroup;
  private loading: boolean;
  private onEmailSent: Subscription;

  constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, private userService:UserService) {
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
    signupInfo.email=this.signupForm.get('email').value;
    
    this.onEmailSent = this.userService.signup(signupInfo).subscribe(ok => {
      this.toastr.success('Email successfully sent. Please check your email inbox.', 'Success');
      this.loading = false;
    }, err => {
      this.toastr.error(err, 'Error sending the email');
      this.loading = false;
    });

  }
}
