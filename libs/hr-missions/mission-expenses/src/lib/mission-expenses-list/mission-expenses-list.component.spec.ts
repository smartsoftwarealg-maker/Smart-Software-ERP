import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MissionExpensesListComponent} from "@ss/hr-missions/mission-expenses";


describe('MissionExpensesComponent', () => {
  let component: MissionExpensesListComponent;
  let fixture: ComponentFixture<MissionExpensesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionExpensesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionExpensesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
