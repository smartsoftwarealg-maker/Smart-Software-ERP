import { TestBed } from '@angular/core/testing';

import { AssetCostsTypeService } from './asset-costs-type.service';

describe('AssetCostsLookupService', () => {
  let service: AssetCostsTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetCostsTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
