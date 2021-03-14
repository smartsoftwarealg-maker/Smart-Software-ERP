import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCancellationDetailComponent } from './delivery-cancellation-detail.component';

describe('DeliveryCancellationDetailComponent', () => {
  let component: DeliveryCancellationDetailComponent;
  let fixture: ComponentFixture<DeliveryCancellationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCancellationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCancellationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
