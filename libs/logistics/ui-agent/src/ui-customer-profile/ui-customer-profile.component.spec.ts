import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCustomerProfileComponent } from './ui-customer-profile.component';

describe('UiCustomerProfileComponent', () => {
  let component: UiCustomerProfileComponent;
  let fixture: ComponentFixture<UiCustomerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiCustomerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCustomerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
