import { TestBed } from '@angular/core/testing';

import { DasService } from './das.service';

describe('DasService', () => {
  let service: DasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
