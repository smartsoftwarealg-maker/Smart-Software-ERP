import { TestBed } from '@angular/core/testing';

import { LoansConsumptionService } from './loans-consumption.service';

describe('LoansConsumptionService', () => {
  let service: LoansConsumptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoansConsumptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
