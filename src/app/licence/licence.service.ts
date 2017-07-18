import { Subject } from 'rxjs/Subject';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpService } from '../shared/http/http.service';
import { Licence } from './licence.model';
import { Injectable } from '@angular/core';

@Injectable()
export class LicenceService {

  // subject
  selectedLicence = new Subject<Licence>();

  // licences: Licence[] = [
  //   new Licence(1, "App #1", "2017-12-15", "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDEiLCJpYXQiOjE0OTkxMTk5NDksInN1YiI6InBjaGliYW5fb3BlbmJyYXZvX3BvcyIsImlzcyI6InBjaGliYW4iLCJleHAiOjE1MzA2NTU5NDl9.GKDu7zOeb6T2J6O08kbXsJ6Rt6fvx8tgXtoFJq-y6l8", true),
  //   new Licence(2, "App #2", "2017-12-15", "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDEiLCJpYXQiOjE0OTkxMTk5NDksInN1YiI6InBjaGliYW5fb3BlbmJyYXZvX3BvcyIsImlzcyI6InBjaGliYW4iLCJleHAiOjE1MzA2NTU5NDl9.GKDu7zOeb6T2J6O08kbXsJ6Rt6fvx8tgXtoFJq-y6l8", true),
  //   new Licence(3, "App #3", "2017-12-15", "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDEiLCJpYXQiOjE0OTkxMTk5NDksInN1YiI6InBjaGliYW5fb3BlbmJyYXZvX3BvcyIsImlzcyI6InBjaGliYW4iLCJleHAiOjE1MzA2NTU5NDl9.GKDu7zOeb6T2J6O08kbXsJ6Rt6fvx8tgXtoFJq-y6l8", true),
  //   new Licence(4, "App #4", "2017-12-15", "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDEiLCJpYXQiOjE0OTkxMTk5NDksInN1YiI6InBjaGliYW5fb3BlbmJyYXZvX3BvcyIsImlzcyI6InBjaGliYW4iLCJleHAiOjE1MzA2NTU5NDl9.GKDu7zOeb6T2J6O08kbXsJ6Rt6fvx8tgXtoFJq-y6l8", true)
  // ];

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
