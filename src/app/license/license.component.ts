import { Modal } from 'ng2-modal';
import { AlertService } from './../shared/alert/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../login/authentication.service';
import { Subscription } from 'rxjs/Rx';
import { License } from './license.model';
import { LicenseService } from './license.service';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit, OnDestroy {

  // var
  modalElement = {
    header: '',
    body: ''
  };

  licenses: License[];

  // subscriptions
  onSaveLicense: Subscription;
  licenseSavedSubscription: Subscription;
  licenseDeletedSubscription: Subscription;
  loadLicensesSubscription: Subscription;

  // child
  @ViewChild('myModal')
  modal: Modal;

  constructor(
    private licenseService: LicenseService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // when license is saved
    this.onSaveLicense = this.licenseService.onSaveLicense.subscribe(license => {
      this.saveLicense(license);
    });

    // load license
    this.loadLicenses();
  }

  ngOnDestroy() {
    if (this.licenseSavedSubscription && this.licenseSavedSubscription !== null) {
      this.licenseSavedSubscription.unsubscribe();
    }
    if (this.loadLicensesSubscription && this.loadLicensesSubscription !== null) {
      this.loadLicensesSubscription.unsubscribe();
    }
    if (this.licenseDeletedSubscription && this.licenseDeletedSubscription !== null) {
      this.licenseDeletedSubscription.unsubscribe();
    }
    if (this.onSaveLicense && this.onSaveLicense !== null) {
      this.onSaveLicense.unsubscribe();
    }
  }

  saveLicense(license: License) {
    this.licenseSavedSubscription = this.licenseService.saveLicense(license).subscribe(response => {
      // went fine
      this.alertService.info('License properly saved');
      this.loadLicenses();
    }, error => {
      // error
      this.alertService.error(error);
    });
  }

  loadLicenses() {
    this.loadLicensesSubscription = this.licenseService.getLicenses().subscribe(licenseList => {
      this.licenses = licenseList;
    }, (response: Response) => {
      if (response.status === 403) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        this.alertService.error('Session expired. Please log in again.');
      } else {
        this.alertService.error('Error loading licenses.');
      }
    });
  }

  showSerialId(license: License) {
    this.modalElement.header = "" + license.applicationId;
    this.modalElement.body = '' + license.serialId;
    this.modal.open();
  }

  editLicense(license: License) {
    this.licenseService.selectedLicense.next(license);
  }

  removeLicense(license: License) {
    this.licenseDeletedSubscription = this.licenseService.removeLicense(license).subscribe(() => {
      // went fine
      this.alertService.info('License successfully deleted.');
      this.loadLicenses();
    }, err => {
      // error
      this.alertService.error(err);
    });
  }
}
