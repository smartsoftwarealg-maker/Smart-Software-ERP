import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLinesDetailComponent } from './transaction-lines-detail.component';

describe('TransactionLinesDetailComponent', () => {
  let component: TransactionLinesDetailComponent;
  let fixture: ComponentFixture<TransactionLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
