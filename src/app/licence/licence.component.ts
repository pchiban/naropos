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
  licences: Licence[];

  constructor(private licenceService: LicenceService) { }

  ngOnInit() {
    this.licences = this.licenceService.getLicences();
  }

  showSerialId(serialId) {
    alert(serialId);
  }

  editLicence(licence: Licence) {
    this.licenceService.selectedLicence.next(licence);
  }
}
