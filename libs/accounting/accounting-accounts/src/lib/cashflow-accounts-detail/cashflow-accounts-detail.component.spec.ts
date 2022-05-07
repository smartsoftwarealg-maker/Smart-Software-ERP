import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowAccountsDetailComponent } from './cashflow-accounts-detail.component';

describe('CashflowAccountsDetailComponent', () => {
  let component: CashflowAccountsDetailComponent;
  let fixture: ComponentFixture<CashflowAccountsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashflowAccountsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashflowAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
