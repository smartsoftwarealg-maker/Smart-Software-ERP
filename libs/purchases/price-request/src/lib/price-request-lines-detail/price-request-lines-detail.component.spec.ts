import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRequestLinesDetailComponent } from './price-request-lines-detail.component';

describe('OrderLinesDetailComponent', () => {
  let component: PriceRequestLinesDetailComponent;
  let fixture: ComponentFixture<PriceRequestLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceRequestLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRequestLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
