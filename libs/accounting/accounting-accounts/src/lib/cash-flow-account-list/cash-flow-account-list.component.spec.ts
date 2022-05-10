import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowAccountListComponent } from './cash-flow-account-list.component';

describe('CashFlowAccountListComponent', () => {
  let component: CashFlowAccountListComponent;
  let fixture: ComponentFixture<CashFlowAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
