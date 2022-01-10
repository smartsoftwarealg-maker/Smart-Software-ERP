import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentNumberingDetailComponent } from './document-numbering-detail.component';

describe('DocumentNumberingDetailComponent', () => {
  let component: DocumentNumberingDetailComponent;
  let fixture: ComponentFixture<DocumentNumberingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentNumberingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentNumberingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
