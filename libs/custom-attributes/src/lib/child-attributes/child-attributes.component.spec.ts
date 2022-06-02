import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAttributesComponent } from './child-attributes.component';

describe('ChildAttributesComponent', () => {
  let component: ChildAttributesComponent;
  let fixture: ComponentFixture<ChildAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
