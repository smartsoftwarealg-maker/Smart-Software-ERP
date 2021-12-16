import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaLinesListComponent } from './proforma-lines-list.component';

describe('ProformaLinesListComponent', () => {
  let component: ProformaLinesListComponent;
  let fixture: ComponentFixture<ProformaLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaLinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
