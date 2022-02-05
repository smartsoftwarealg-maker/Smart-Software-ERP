import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsMainComponent } from './lookups-main.component';

describe('LookupsMainComponentComponent', () => {
  let component: LookupsMainComponent;
  let fixture: ComponentFixture<LookupsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
