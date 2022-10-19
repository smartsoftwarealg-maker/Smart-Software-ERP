import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: FoodCartComponent;
  let fixture: ComponentFixture<FoodCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
