/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LicenceService } from './licence.service';

describe('LicenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicenceService]
    });
  });

  it('should ...', inject([LicenceService], (service: LicenceService) => {
    expect(service).toBeTruthy();
  }));
});
