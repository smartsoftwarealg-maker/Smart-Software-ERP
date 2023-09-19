import { TestBed } from '@angular/core/testing';

import { ElementsEntryService } from './elements-entry.service';

describe('ElementsEntryService', () => {
  let service: ElementsEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementsEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
