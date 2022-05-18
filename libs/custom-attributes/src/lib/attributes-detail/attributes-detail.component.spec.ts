import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesDetailComponent } from './attributes-detail.component';

describe('AttributesDetailComponent', () => {
  let component: AttributesDetailComponent;
  let fixture: ComponentFixture<AttributesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
