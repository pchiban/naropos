import { FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {

  @Input("group")
  passwordForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.passwordForm.get('password').setValidators(Validators.required);
    this.passwordForm.get('repeatPassword').setValidators([Validators.required, this.repeatPasswordValidator.bind(this)]);
  }

  repeatPasswordValidator(control: FormControl): ValidationErrors {
    let value = control.value;

    if (this.passwordForm) {
      if (this.passwordForm.get('password').value !== value) {
        return { 'passwordsDontMatch': true };
      }
    }

    return null;
  }
}
