import { TestBed } from '@angular/core/testing';

import { ChildAttributesService } from './child-attributes.service';

describe('ChildAttributesService', () => {
  let service: ChildAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
