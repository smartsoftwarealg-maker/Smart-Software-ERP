import { TestBed } from '@angular/core/testing';

import { PayrollAmendmentService } from './payroll-amendment.service';

describe('PayrollAmendmentService', () => {
  let service: PayrollAmendmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollAmendmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
