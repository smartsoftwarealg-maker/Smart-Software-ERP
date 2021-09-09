import { TestBed, inject } from '@angular/core/testing';

import { ReportCatalogService } from './report-catalog.service';

describe('ReportCatalogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportCatalogService]
    });
  });

  it('should be created', inject([ReportCatalogService], (service: ReportCatalogService) => {
    expect(service).toBeTruthy();
  }));
});
