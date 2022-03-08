import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderDetailComponent } from './payment-order-detail.component';

describe('PaymentOrderDetailComponent', () => {
  let component: PaymentOrderDetailComponent;
  let fixture: ComponentFixture<PaymentOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
