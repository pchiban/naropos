import { Licence } from './../licence.model';
import { Subscription } from 'rxjs/Rx';
import { LicenceService } from '../licence.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-licence-form',
  templateUrl: './licence-form.component.html',
  styleUrls: ['./licence-form.component.css']
})
export class LicenceFormComponent implements OnInit {

  // form
  licenceId: Number;
  licenceForm: FormGroup;

  // subcription
  selectedLicenceSubscription: Subscription;

  constructor(private licenceService: LicenceService) { }

  ngOnInit() {
    this.licenceForm = new FormGroup({
      'applicationId': new FormControl(null, Validators.required),
      'expirationDate': new FormControl(null, Validators.required),
      'active': new FormControl(null)
    });

    this.licenceService.selectedLicence.subscribe(licence => {
      this.licenceId = licence.id;
      this.licenceForm.patchValue({
        'applicationId': licence.applicationId,
        'expirationDate': licence.expirationDate,
        'active': licence.active
      });
    });
  }

  saveLicence(licence: Licence) {

  }

  doCancel() {
    this.licenceForm.reset();
  }
}
