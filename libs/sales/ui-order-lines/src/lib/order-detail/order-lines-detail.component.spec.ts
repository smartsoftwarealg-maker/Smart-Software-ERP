import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLinesDetailComponent } from './order-lines-detail.component';

describe('OrderLinesDetailComponent', () => {
  let component: OrderLinesDetailComponent;
  let fixture: ComponentFixture<OrderLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
