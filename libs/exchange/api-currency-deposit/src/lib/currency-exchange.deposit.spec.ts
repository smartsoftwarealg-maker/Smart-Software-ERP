import { TestBed } from '@angular/core/testing';

import { CurrencyDepositService } from './currency-deposit.service';

describe('CurrencyExchangeService', () => {
  let service: CurrencyDepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyDepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
