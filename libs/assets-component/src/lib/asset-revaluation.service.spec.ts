import { TestBed } from '@angular/core/testing';

import { AssetRevaluationService } from './services/asset-revaluation.service';

describe('AssetRevaluationService', () => {
  let service: AssetRevaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetRevaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
