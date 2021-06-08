import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRightsListComponent } from './access-rights-list.component';

describe('AccessRightsComponent', () => {
  let component: AccessRightsListComponent;
  let fixture: ComponentFixture<AccessRightsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRightsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
