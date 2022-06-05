import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbUpdaterComponent } from './db-updater.component';

describe('DbUpdaterComponent', () => {
  let component: DbUpdaterComponent;
  let fixture: ComponentFixture<DbUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbUpdaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
