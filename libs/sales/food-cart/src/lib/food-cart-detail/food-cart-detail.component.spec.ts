import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCartDetailComponent } from './shopping-cart-detail.component';

describe('ShoppingCartDetailComponent', () => {
  let component: FoodCartDetailComponent;
  let fixture: ComponentFixture<FoodCartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCartDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
