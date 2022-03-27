import { TestBed } from '@angular/core/testing';

import { AssetBlockingService } from './asset-blocking.service';

describe('AssetBlockingService', () => {
  let service: AssetBlockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetBlockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
