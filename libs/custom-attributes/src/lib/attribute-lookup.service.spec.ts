import { TestBed } from '@angular/core/testing';

import { AttributeLookupService } from './attribute-lookup.service';

describe('AttributeLookupService', () => {
  let service: AttributeLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
