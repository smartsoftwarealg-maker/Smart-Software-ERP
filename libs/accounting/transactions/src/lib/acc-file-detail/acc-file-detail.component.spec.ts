import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccFileDetailComponent } from './acc-file-detail.component';

describe('AccFileDetailComponent', () => {
  let component: AccFileDetailComponent;
  let fixture: ComponentFixture<AccFileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccFileDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccFileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
