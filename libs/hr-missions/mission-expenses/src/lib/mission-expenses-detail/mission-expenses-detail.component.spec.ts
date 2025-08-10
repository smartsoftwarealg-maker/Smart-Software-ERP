import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MissionExpensesDetailComponent} from '@ss/hr-missions/mission-expenses';

describe('MissionExpensesDetailComponent', () => {
  let component: MissionExpensesDetailComponent;
  let fixture: ComponentFixture<MissionExpensesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionExpensesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionExpensesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
