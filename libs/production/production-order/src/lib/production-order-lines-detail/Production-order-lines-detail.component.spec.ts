import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderLinesDetailComponent } from './production-order-lines-detail.component';

describe('OrderLinesDetailComponent', () => {
  let component: ProductionOrderLinesDetailComponent;
  let fixture: ComponentFixture<ProductionOrderLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionOrderLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionOrderLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
