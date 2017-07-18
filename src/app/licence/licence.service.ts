import { Subject } from 'rxjs/Subject';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpService } from '../shared/http/http.service';
import { Licence } from './licence.model';
import { Injectable } from '@angular/core';

@Injectable()
export class LicenceService {

  // subject
  selectedLicence = new Subject<Licence>();

  constructor(private httpService: HttpService) { }

  getLicences() {
    return this.httpService.get('/license').map(response => {
      let licenceList: Licence[] = [];
      let responseList: Object[] = <Object[]>response.json();
      for (let i = 0; i < responseList.length; i++) {
        licenceList.push(Licence.fromJSON(JSON.stringify(responseList[i])));
      }
      return licenceList;
    });
  }

  saveLicence(licence: Licence) {
    if (licence.id !== null) {
      // update
    } else {
      // insert
    }
  }

  removeLicence(licece: Licence) {

  }

}
