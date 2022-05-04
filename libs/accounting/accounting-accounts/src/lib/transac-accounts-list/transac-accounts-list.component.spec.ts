import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacAccountsListComponent } from './transac-accounts-list.component';

describe('TransacAccountsListComponent', () => {
  let component: TransacAccountsListComponent;
  let fixture: ComponentFixture<TransacAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacAccountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
