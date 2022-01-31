import { TestBed } from '@angular/core/testing';

import { VacationPlanningListService } from './vacation-planning-list.service';

describe('VacationPlanningListService', () => {
  let service: VacationPlanningListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationPlanningListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
