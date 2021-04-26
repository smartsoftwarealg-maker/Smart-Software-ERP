import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcDocInfoComponent } from './exc-doc-info.component';

describe('DocInfoComponent', () => {
  let component: ExcDocInfoComponent;
  let fixture: ComponentFixture<ExcDocInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcDocInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcDocInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
