import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsInfoComponent } from './elements-info.component';

describe('ElementsInfoComponent', () => {
  let component: ElementsInfoComponent;
  let fixture: ComponentFixture<ElementsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
