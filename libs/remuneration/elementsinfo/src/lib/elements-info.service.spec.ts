import { TestBed } from '@angular/core/testing';

import { ElementsInfoService } from './elements-info.service';

describe('ElementsInfoService', () => {
  let service: ElementsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
