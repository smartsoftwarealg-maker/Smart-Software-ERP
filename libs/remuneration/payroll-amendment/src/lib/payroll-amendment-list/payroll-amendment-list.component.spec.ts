import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAmendmentListComponent } from './payroll-amendment-list.component';

describe('SpecialPayrollAmendmentListComponent', () => {
  let component: PayrollAmendmentListComponent;
  let fixture: ComponentFixture<PayrollAmendmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollAmendmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAmendmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
