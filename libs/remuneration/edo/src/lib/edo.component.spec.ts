import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdoComponent } from './edo.component';

describe('EdoComponent', () => {
  let component: EdoComponent;
  let fixture: ComponentFixture<EdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
