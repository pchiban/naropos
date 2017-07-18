import { Subscription } from 'rxjs/Rx';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { debug } from 'util';
import { Licence } from './licence.model';
import { LicenceService } from './licence.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.css']
})
export class LicenceComponent implements OnInit {

  // var
  busy: Subscription;
  licences: Licence[];

  constructor(private licenceService: LicenceService) { }

  ngOnInit() {
    this.busy = this.licenceService.getLicences().subscribe(licenceList => {
      this.licences = licenceList;
    });
  }

  showSerialId(serialId) {
    alert(serialId);
  }

  editLicence(licence: Licence) {
    this.licenceService.selectedLicence.next(licence);
  }
}
