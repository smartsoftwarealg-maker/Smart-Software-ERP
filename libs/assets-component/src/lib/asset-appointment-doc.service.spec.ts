import { TestBed } from '@angular/core/testing';

import { AssetAppointmentDocService } from './asset-appointment-doc.service';

describe('AssetAppointmentDocService', () => {
  let service: AssetAppointmentDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetAppointmentDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
