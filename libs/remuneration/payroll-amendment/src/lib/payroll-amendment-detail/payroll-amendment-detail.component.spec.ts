import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAmendmentDetailComponent } from './payroll-amendment-detail.component';

describe('SpecialPayrollAmendmentDetailComponent', () => {
  let component: PayrollAmendmentDetailComponent;
  let fixture: ComponentFixture<PayrollAmendmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollAmendmentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAmendmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
