import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCancellationListComponent } from './delivery-cancellation-list.component';

describe('DeliveryCancellationListComponent', () => {
  let component: DeliveryCancellationListComponent;
  let fixture: ComponentFixture<DeliveryCancellationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCancellationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCancellationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
