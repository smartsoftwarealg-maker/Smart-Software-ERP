import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderListComponent } from '@ss/production/production-order';

describe('UiOrderComponent', () => {
  let component: ProductionOrderListComponent;
  let fixture: ComponentFixture<ProductionOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
