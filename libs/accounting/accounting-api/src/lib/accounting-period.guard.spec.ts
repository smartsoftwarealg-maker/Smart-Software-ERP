import { TestBed } from '@angular/core/testing';

import { AccountingPeriodGuard } from './accounting-period.guard';

describe('AccountingPeriodGuard', () => {
  let guard: AccountingPeriodGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountingPeriodGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
