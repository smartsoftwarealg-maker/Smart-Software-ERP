import { TestBed } from '@angular/core/testing';

import { EmployeeDiplomaService } from './employee-diploma.service';

describe('EmployeeDiplomaService', () => {
  let service: EmployeeDiplomaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDiplomaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
