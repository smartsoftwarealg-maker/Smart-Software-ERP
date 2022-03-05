import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDiplomaListComponent } from './employee-diploma-list.component';

describe('EmployeeDiplomaListComponent', () => {
  let component: EmployeeDiplomaListComponent;
  let fixture: ComponentFixture<EmployeeDiplomaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDiplomaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDiplomaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
