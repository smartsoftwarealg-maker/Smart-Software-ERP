import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajectoryListComponent } from './trajectory-list.component';

describe('TrajectoryListComponent', () => {
  let component: TrajectoryListComponent;
  let fixture: ComponentFixture<TrajectoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrajectoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajectoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
