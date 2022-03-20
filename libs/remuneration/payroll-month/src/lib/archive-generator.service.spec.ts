import { TestBed } from '@angular/core/testing';

import { ArchiveGeneratorService } from './archive-generator.service';

describe('ArchiveGeneratorService', () => {
  let service: ArchiveGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchiveGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
