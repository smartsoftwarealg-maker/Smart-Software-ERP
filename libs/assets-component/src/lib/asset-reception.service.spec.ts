import { TestBed } from '@angular/core/testing';

import { AssetReceptionService } from './services/asset-reception.service';

describe('AssetReceptionService', () => {
  let service: AssetReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetReceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
