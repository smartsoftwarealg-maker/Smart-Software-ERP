import { TestBed } from '@angular/core/testing';

import { AssetAccountService } from './asset-account.service';

describe('AssetAccountService', () => {
  let service: AssetAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
