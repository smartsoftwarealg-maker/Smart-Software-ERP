import { TestBed } from '@angular/core/testing';

import { AssetCostsService } from './asset-costs.service';

describe('AssetCostsService', () => {
  let service: AssetCostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetCostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
