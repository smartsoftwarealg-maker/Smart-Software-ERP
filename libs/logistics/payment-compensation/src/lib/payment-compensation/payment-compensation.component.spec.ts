import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCompensationComponent } from './payment-compensation.component';

describe('PaymentCompensationComponent', () => {
  let component: PaymentCompensationComponent;
  let fixture: ComponentFixture<PaymentCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
