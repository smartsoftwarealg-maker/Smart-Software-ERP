import { TestBed } from '@angular/core/testing';

import { EdoService } from './edo.service';

describe('EdoService', () => {
  let service: EdoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
