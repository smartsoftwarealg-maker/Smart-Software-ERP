import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsInfoDetailComponent } from './elements-info-detail.component';

describe('ElementsInfoDetailComponent', () => {
  let component: ElementsInfoDetailComponent;
  let fixture: ComponentFixture<ElementsInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsInfoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
