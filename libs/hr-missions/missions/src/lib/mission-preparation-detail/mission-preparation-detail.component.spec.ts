import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPreparationDetailComponent } from './mission-preparation-detail.component';

describe('MissionPreparationDetailComponent', () => {
  let component: MissionPreparationDetailComponent;
  let fixture: ComponentFixture<MissionPreparationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionPreparationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionPreparationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
