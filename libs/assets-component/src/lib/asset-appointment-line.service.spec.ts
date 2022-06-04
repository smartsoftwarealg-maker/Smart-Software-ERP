import { TestBed } from '@angular/core/testing';

import { AssetAppointmentLineService } from './asset-appointment-line.service';

describe('AssetAppointmentLineService', () => {
  let service: AssetAppointmentLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetAppointmentLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
