import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPreparationListComponent } from './mission-expenses-list.component';

describe('MissionPreparationComponent', () => {
  let component: MissionPreparationListComponent;
  let fixture: ComponentFixture<MissionPreparationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionPreparationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionPreparationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
