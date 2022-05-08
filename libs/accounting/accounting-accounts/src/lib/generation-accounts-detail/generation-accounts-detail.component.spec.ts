import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationAccountsDetailComponent } from './generation-accounts-detail.component';

describe('GenerationAccountsDetailComponent', () => {
  let component: GenerationAccountsDetailComponent;
  let fixture: ComponentFixture<GenerationAccountsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationAccountsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
