import { Subject } from 'rxjs/Subject';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpService } from '../shared/http/http.service';
import { License } from './license.model';
import { Injectable } from '@angular/core';

@Injectable()
export class LicenseService {

  // subject
  selectedLicense = new Subject<License>();

  constructor(private httpService: HttpService) { }

  getLicenses() {
    return this.httpService.get('/license').map(response => {
      let licenseList: License[] = [];
      let responseList: Object[] = <Object[]>response.json();
      for (let i = 0; i < responseList.length; i++) {
        licenseList.push(License.fromJSON(JSON.stringify(responseList[i])));
      }
      return licenseList;
    });
  }

  saveLicense(license: License) {
    if (license.id !== null) {
      // update
    } else {
      // insert
    }
  }

  removeLicense(licese: License) {

  }

}
