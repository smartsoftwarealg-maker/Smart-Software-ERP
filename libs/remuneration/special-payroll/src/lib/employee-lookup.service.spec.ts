import { TestBed } from '@angular/core/testing';

import { EmployeeLookupService } from './employee-lookup.service';

describe('EmployeeLookupService', () => {
  let service: EmployeeLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
