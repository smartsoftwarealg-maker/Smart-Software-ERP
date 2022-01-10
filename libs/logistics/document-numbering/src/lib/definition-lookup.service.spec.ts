import { TestBed } from '@angular/core/testing';

import { DefinitionLookupService } from './definition-lookup.service';

describe('DefinitionLookupService', () => {
  let service: DefinitionLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinitionLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
