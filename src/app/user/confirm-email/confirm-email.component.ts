import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SignupInfo } from '../signup/signup.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {

  token: String;
  setPasswordForm: FormGroup;
  onSignupSubscription: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.token)
      .subscribe(params => {
        this.token = params.token;
      });

    this.setPasswordForm = new FormGroup({
      'password': new FormControl(null, Validators.required),
      'repeatPassword': new FormControl(null)
    });
  }

  ngOnDestroy() {
    if (this.onSignupSubscription) {
      this.onSignupSubscription.unsubscribe();
    }
  }

  setPassword() {
    let signupInfo = new SignupInfo();
    signupInfo.token = this.token;
    signupInfo.password = this.setPasswordForm.get('password').value;

    this.onSignupSubscription = this.userService.confirmSignup(signupInfo).subscribe(() => {
      this.setPasswordForm.reset();
      this.toastr.success('User account successfully created').then(()=>{
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },3000);
      }, ()=>{});
    }, () => {
      this.toastr.error('Error creating the user account');
    });
  }
}
