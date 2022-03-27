import { TestBed } from '@angular/core/testing';

import { AssetCostTypeService } from './asset-cost-type.service';

describe('AssetCostTypeService', () => {
  let service: AssetCostTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetCostTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
