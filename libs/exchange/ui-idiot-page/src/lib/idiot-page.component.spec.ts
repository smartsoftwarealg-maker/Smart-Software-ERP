import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiotPageComponent } from './idiot-page.component';

describe('IdiotPageComponent', () => {
  let component: IdiotPageComponent;
  let fixture: ComponentFixture<IdiotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdiotPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
