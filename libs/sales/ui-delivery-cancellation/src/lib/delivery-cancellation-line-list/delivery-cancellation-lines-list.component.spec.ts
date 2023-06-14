import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCancellationLinesListComponent } from './delivery-cancellation-lines-list.component';

describe('DeliveryCancellationLinesListComponent', () => {
  let component: DeliveryCancellationLinesListComponent;
  let fixture: ComponentFixture<DeliveryCancellationLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCancellationLinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCancellationLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
