import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAppointmentListComponent } from './asset-appointment-list.component';

describe('AssetAppointmentListComponent', () => {
  let component: AssetAppointmentListComponent;
  let fixture: ComponentFixture<AssetAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
