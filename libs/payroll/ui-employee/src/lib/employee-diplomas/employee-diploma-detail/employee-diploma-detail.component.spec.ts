import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDiplomaDetailComponent } from './employee-diploma-detail.component';

describe('EmployeeDiplomaDetailComponent', () => {
  let component: EmployeeDiplomaDetailComponent;
  let fixture: ComponentFixture<EmployeeDiplomaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EmployeeDiplomaDetailComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDiplomaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
