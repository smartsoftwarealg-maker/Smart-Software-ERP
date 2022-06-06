import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAppointmentDocDetailComponent } from './asset-appointment-doc-detail.component';

describe('AssetAppointmentDocDetailComponent', () => {
  let component: AssetAppointmentDocDetailComponent;
  let fixture: ComponentFixture<AssetAppointmentDocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAppointmentDocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAppointmentDocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
