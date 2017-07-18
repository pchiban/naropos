import { AlertService } from './../shared/alert/alert.service';
import { AuthenticationService } from './authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  returnUrl: string;

  // form
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // form
    this.form = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.form.get('username').value, this.form.get('password').value)
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.form.reset();
        this.loading = false;
        this.alertService.error('User/password invalid. Please check credentials.');
      });
  }

}
