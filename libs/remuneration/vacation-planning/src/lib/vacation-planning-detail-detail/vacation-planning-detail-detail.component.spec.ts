import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationPlanningDetailDetailComponent } from './vacation-planning-detail-detail.component';

describe('VacationPlanningDetailDetailComponent', () => {
  let component: VacationPlanningDetailDetailComponent;
  let fixture: ComponentFixture<VacationPlanningDetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationPlanningDetailDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationPlanningDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
