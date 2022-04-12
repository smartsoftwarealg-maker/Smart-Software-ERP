import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLinesListComponent } from './transaction-lines-list.component';

describe('TransactionLinesListComponent', () => {
  let component: TransactionLinesListComponent;
  let fixture: ComponentFixture<TransactionLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionLinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
