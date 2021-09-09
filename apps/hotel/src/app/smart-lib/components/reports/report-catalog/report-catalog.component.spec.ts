import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportCatalogComponent } from './report-catalog.component';

describe('ReportCatalogComponent', () => {
  let component: ReportCatalogComponent;
  let fixture: ComponentFixture<ReportCatalogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
