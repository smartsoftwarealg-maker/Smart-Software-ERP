import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationLinesDetailComponent } from './quotation-lines-detail.component';

describe('QuotationLinesDetailComponent', () => {
  let component: QuotationLinesDetailComponent;
  let fixture: ComponentFixture<QuotationLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
