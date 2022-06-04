import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAppointmentDocListComponent } from './asset-appointment-doc-list.component';

describe('AssetAppointmentDocListComponent', () => {
  let component: AssetAppointmentDocListComponent;
  let fixture: ComponentFixture<AssetAppointmentDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAppointmentDocListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAppointmentDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
