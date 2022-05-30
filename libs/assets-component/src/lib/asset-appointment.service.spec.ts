import { TestBed } from '@angular/core/testing';

import { AssetAppointmentService } from './asset-appointment.service';

describe('AssetAppointmentService', () => {
  let service: AssetAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
