import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccFileListComponent } from './acc-file-list.component';

describe('AccFileListComponent', () => {
  let component: AccFileListComponent;
  let fixture: ComponentFixture<AccFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccFileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
