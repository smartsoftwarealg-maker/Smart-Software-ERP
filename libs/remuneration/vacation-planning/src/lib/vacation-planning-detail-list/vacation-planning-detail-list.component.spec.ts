import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationPlanningDetailListComponent } from './vacation-planning-detail-list.component';

describe('VacationPlanningDetailComponent', () => {
  let component: VacationPlanningDetailListComponent;
  let fixture: ComponentFixture<VacationPlanningDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationPlanningDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationPlanningDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
