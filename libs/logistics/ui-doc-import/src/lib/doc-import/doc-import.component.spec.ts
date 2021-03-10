import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocImportComponent } from './doc-import.component';

describe('DocImportComponent', () => {
  let component: DocImportComponent;
  let fixture: ComponentFixture<DocImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
