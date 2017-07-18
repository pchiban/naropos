/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LicenseService } from './license.service';

describe('LicenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicenseService]
    });
  });

  it('should ...', inject([LicenseService], (service: LicenseService) => {
    expect(service).toBeTruthy();
  }));
});
