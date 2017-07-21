import { Subject } from 'rxjs/Subject';
import { License } from './../license.model';
import { Subscription } from 'rxjs/Rx';
import { LicenseService } from '../license.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.css'],
  providers: [DatePipe]
})
export class LicenseFormComponent implements OnInit, OnDestroy {

  // form
  licenseId: Number;
  licenseForm: FormGroup;

  // subcription
  selectedLicenseSubscription: Subscription;

  constructor(private licenseService: LicenseService, private datePipe: DatePipe) { }

  ngOnInit() {

    this.licenseForm = new FormGroup({
      'applicationId': new FormControl(null, Validators.required),
      'expirationDate': new FormControl(null, Validators.required),
      'active': new FormControl(null)
    });

    this.selectedLicenseSubscription = this.licenseService.selectedLicense.subscribe(license => {
      this.licenseId = license.id;
      this.licenseForm.patchValue({
        'applicationId': license.applicationId,
        'expirationDate': this.datePipe.transform(license.expirationDate, 'yyyy-MM-dd'),
        'active': license.active
      });
    });
  }

  ngOnDestroy() {
    if (this.selectedLicenseSubscription && this.selectedLicenseSubscription !== null) {
      this.selectedLicenseSubscription.unsubscribe();
    }
  }

  saveLicense() {
    // create license
    let id = this.licenseId;
    let appId = this.licenseForm.get('applicationId').value;
    let expirationDate = this.licenseForm.get('expirationDate').value;
    let active = this.licenseForm.get('active').value;

    let license = new License(id, appId, expirationDate, null, active);
    this.licenseService.onSaveLicense.next(license);

    this.doCancel();
  }

  doCancel() {
    this.licenseId = null;
    this.licenseForm.reset();
  }
}
