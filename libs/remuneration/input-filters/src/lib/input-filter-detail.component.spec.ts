import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFilterDetailComponent } from './input-filter-detail.component';

describe('InputFilterDetailComponent', () => {
  let component: InputFilterDetailComponent;
  let fixture: ComponentFixture<InputFilterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFilterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFilterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
