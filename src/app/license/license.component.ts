import { AlertService } from './../shared/alert/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../login/authentication.service';
import { Subscription } from 'rxjs/Rx';
import { License } from './license.model';
import { LicenseService } from './license.service';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit, OnDestroy {

  // var
  licenses: License[];

  // subscriptions
  licenseAddedSubscription: Subscription;
  licenseUpdatedSubscription: Subscription;
  loadLicensesSubscription: Subscription;

  constructor(
    private licenseService: LicenseService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // when license is added
    this.licenseAddedSubscription = this.licenseService.licenseAdded.subscribe(license => {
      this.loadLicenses();
    });

    // when license is updated
    this.licenseUpdatedSubscription = this.licenseService.licenseUpdated.subscribe(license => {
      this.loadLicenses();
    });

    // load license
    this.loadLicenses();
  }

  ngOnDestroy() {
    this.licenseAddedSubscription.unsubscribe();
    this.licenseUpdatedSubscription.unsubscribe();
    this.loadLicensesSubscription.unsubscribe();
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

  showSerialId(serialId) {
    alert(serialId);
  }

  editLicense(license: License) {
    this.licenseService.selectedLicense.next(license);
  }
}
