import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationLinesListComponent } from './quotation-lines-list.component';

describe('QuotationLinesListComponent', () => {
  let component: QuotationLinesListComponent;
  let fixture: ComponentFixture<QuotationLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationLinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
