import { TestBed } from '@angular/core/testing';

import { ExcelInjectionService } from './excel-injection.service';

describe('ExcelInjectionService', () => {
  let service: ExcelInjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelInjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
