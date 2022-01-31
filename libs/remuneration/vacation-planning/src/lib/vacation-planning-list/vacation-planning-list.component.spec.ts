import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationPlanningListComponent } from './vacation-planning-list.component';

describe('VacationPlanningListComponent', () => {
  let component: VacationPlanningListComponent;
  let fixture: ComponentFixture<VacationPlanningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationPlanningListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationPlanningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
