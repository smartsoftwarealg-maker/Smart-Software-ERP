import { TestBed } from '@angular/core/testing';

import { SpecialPayrollService } from './special-payroll.service';

describe('SpecialPayrollService', () => {
  let service: SpecialPayrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialPayrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
