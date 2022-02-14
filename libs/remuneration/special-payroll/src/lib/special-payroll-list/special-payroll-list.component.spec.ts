import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPayrollListComponent } from './special-payroll-list.component';

describe('SpecialPayrollListComponent', () => {
  let component: SpecialPayrollListComponent;
  let fixture: ComponentFixture<SpecialPayrollListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPayrollListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPayrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
