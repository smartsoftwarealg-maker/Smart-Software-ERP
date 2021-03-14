import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStockInfoComponent } from './ui-stock-info.component';

describe('OrderLinesDetailComponent', () => {
  let component: UiStockInfoComponent;
  let fixture: ComponentFixture<UiStockInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiStockInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStockInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
