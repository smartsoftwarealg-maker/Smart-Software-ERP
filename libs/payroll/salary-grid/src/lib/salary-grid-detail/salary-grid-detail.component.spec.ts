import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryGridDetailComponent } from './salary-grid-detail.component';

describe('SalaryGridDetailComponent', () => {
  let component: SalaryGridDetailComponent;
  let fixture: ComponentFixture<SalaryGridDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryGridDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryGridDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
