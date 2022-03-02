import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryGridListComponent } from './salary-grid-list.component';

describe('SalaryGridListComponent', () => {
  let component: SalaryGridListComponent;
  let fixture: ComponentFixture<SalaryGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryGridListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
