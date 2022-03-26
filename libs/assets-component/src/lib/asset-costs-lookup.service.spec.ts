import { TestBed } from '@angular/core/testing';

import { AssetCostsLookupService } from './asset-costs-lookup.service';

describe('AssetCostsLookupService', () => {
  let service: AssetCostsLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetCostsLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
