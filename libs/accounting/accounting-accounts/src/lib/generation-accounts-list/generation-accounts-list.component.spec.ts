import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationAccountsListComponent } from './generation-accounts-list.component';

describe('GenerationAccountsListComponent', () => {
  let component: GenerationAccountsListComponent;
  let fixture: ComponentFixture<GenerationAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationAccountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
