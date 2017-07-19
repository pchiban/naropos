import { License } from './../license.model';
import { Subscription } from 'rxjs/Rx';
import { LicenseService } from '../license.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.css'],
  providers: [DatePipe]
})
export class LicenseFormComponent implements OnInit {

  // form
  licenseId: Number;
  licenseForm: FormGroup;

  // subcription
  busySubscription: Subscription;
  selectedlicenseSubscription: Subscription;

  constructor(private licenseService: LicenseService, private datePipe: DatePipe) { }

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
        'expirationDate': this.datePipe.transform(license.expirationDate, 'yyyy-MM-dd'),
        'active': license.active
      });
    });
  }

  saveLicense() {
    // create license
    let id = this.licenseId;
    let appId = this.licenseForm.get('applicationId').value;
    let expirationDate = this.licenseForm.get('expirationDate').value;
    let active = this.licenseForm.get('active').value;

    let license = new License(id, appId, expirationDate, null, active);
    this.busySubscription = this.licenseService.saveLicense(license);

    this.doCancel();
  }

  doCancel() {
    this.licenseId = null;
    this.licenseForm.reset();
  }
}
