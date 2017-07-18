import { License } from './../license.model';
import { Subscription } from 'rxjs/Rx';
import { LicenseService } from '../license.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.css']
})
export class LicenseFormComponent implements OnInit {

  // form
  licenseId: Number;
  licenseForm: FormGroup;

  // subcription
  selectedlicenseSubscription: Subscription;

  constructor(private licenseService: LicenseService) { }

  ngOnInit() {
    this.licenseForm = new FormGroup({
      'applicationId': new FormControl(null, Validators.required),
      'expirationDate': new FormControl(null, Validators.required),
      'active': new FormControl(null)
    });

    this.licenseService.selectedLicense.subscribe(license => {
      this.licenseId = license.id;
      this.licenseForm.patchValue({
        'applicationId': license.applicationId,
        'expirationDate': license.expirationDate,
        'active': license.active
      });
    });
  }

  savelicense(license: License) {

  }

  doCancel() {
    this.licenseForm.reset();
  }
}
