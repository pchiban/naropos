import { Subscription } from 'rxjs/Rx';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { debug } from 'util';
import { License } from './license.model';
import { LicenseService } from './license.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  // var
  busy: Subscription;
  licenses: License[];

  constructor(private licenseService: LicenseService) { }

  ngOnInit() {
    this.busy = this.licenseService.getLicenses().subscribe(licenseList => {
      this.licenses = licenseList;
    });
  }

  showSerialId(serialId) {
    alert(serialId);
  }

  editLicense(license: License) {
    this.licenseService.selectedLicense.next(license);
  }
}
