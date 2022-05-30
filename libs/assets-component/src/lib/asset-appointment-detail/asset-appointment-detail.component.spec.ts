import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAppointmentDetailComponent } from './asset-appointment-detail.component';

describe('AssetAppointmentDetailComponent', () => {
  let component: AssetAppointmentDetailComponent;
  let fixture: ComponentFixture<AssetAppointmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAppointmentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
