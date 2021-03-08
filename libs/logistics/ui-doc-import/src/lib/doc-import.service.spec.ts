import { TestBed } from '@angular/core/testing';

import { DocImportService } from './doc-import.service';

describe('DocImportService', () => {
  let service: DocImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
