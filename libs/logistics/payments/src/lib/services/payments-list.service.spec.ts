import { TestBed } from '@angular/core/testing';

import { PaymentsListService } from './payments-list.service';

describe('PaymentsListService', () => {
  let service: PaymentsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
