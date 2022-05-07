import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowAccountsListComponent } from './cashflow-accounts-list.component';

describe('CashflowAccountsListComponent', () => {
  let component: CashflowAccountsListComponent;
  let fixture: ComponentFixture<CashflowAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashflowAccountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashflowAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
