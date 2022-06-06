import { TestBed } from '@angular/core/testing';

import { DbUpdaterService } from './db-updater.service';

describe('DbUpdaterService', () => {
  let service: DbUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
