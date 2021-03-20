import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderLinesDetailComponent } from './purchase-order-lines-detail.component';

describe('OrderLinesDetailComponent', () => {
  let component: PurchaseOrderLinesDetailComponent;
  let fixture: ComponentFixture<PurchaseOrderLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
