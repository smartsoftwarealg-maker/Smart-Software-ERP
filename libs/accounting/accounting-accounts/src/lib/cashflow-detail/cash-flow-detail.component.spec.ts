import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowDetailComponent } from './cash-flow-detail.component';

describe('CashFlowDetailComponent', () => {
  let component: CashFlowDetailComponent;
  let fixture: ComponentFixture<CashFlowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
