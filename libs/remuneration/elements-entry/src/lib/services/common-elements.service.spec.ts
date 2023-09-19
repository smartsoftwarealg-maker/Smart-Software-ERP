import { TestBed } from '@angular/core/testing';

import { CommonElementsService } from './common-elements.service';

describe('CommonElementsService', () => {
  let service: CommonElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
