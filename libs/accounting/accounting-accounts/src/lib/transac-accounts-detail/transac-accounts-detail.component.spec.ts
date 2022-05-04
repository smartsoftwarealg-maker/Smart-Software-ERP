import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacAccountsDetailComponent } from './transac-accounts-detail.component';

describe('TransacAccountsDetailComponent', () => {
  let component: TransacAccountsDetailComponent;
  let fixture: ComponentFixture<TransacAccountsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacAccountsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
