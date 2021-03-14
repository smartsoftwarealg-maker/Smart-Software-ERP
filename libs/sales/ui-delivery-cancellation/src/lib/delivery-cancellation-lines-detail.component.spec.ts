import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCancellationLinesDetailComponent } from './delivery-cancellation-lines-detail.component';

describe('DeliveryCancellationLinesDetailComponent', () => {
  let component: DeliveryCancellationLinesDetailComponent;
  let fixture: ComponentFixture<DeliveryCancellationLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCancellationLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCancellationLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
