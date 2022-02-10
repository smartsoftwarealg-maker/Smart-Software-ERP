import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationPlanningDetailComponent } from './vacation-planning-detail.component';

describe('VacationPlanningDetailComponent', () => {
  let component: VacationPlanningDetailComponent;
  let fixture: ComponentFixture<VacationPlanningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationPlanningDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationPlanningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
