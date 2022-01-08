import { TestBed } from '@angular/core/testing';

import { PayrollMonthService } from './payroll-month.service';

describe('PayrollMonthService', () => {
  let service: PayrollMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
