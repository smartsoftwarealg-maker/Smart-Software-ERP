import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPayrollDetailComponent } from './special-payroll-detail.component';

describe('SpecialPayrollDetailComponent', () => {
  let component: SpecialPayrollDetailComponent;
  let fixture: ComponentFixture<SpecialPayrollDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPayrollDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPayrollDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
