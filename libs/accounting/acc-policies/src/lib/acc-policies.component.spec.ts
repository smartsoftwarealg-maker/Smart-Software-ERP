import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccPoliciesComponent } from './acc-policies.component';

describe('AccPoliciesComponent', () => {
  let component: AccPoliciesComponent;
  let fixture: ComponentFixture<AccPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
