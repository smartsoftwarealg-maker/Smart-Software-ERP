import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPayrollEntryDetailComponent } from './special-payroll-entry-detail.component';

describe('SpecialPayrollInputdEtailComponent', () => {
  let component: SpecialPayrollEntryDetailComponent;
  let fixture: ComponentFixture<SpecialPayrollEntryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPayrollEntryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPayrollEntryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
