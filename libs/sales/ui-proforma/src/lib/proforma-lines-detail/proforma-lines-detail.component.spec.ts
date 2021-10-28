import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaLinesDetailComponent } from './proforma-lines-detail.component';

describe('ProformaLinesDetailComponent', () => {
  let component: ProformaLinesDetailComponent;
  let fixture: ComponentFixture<ProformaLinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaLinesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
