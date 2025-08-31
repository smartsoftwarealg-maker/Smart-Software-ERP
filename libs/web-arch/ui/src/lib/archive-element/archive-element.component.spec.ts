import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveElementComponent } from './archive-element.component';

describe('ArchiveElementComponent', () => {
  let component: ArchiveElementComponent;
  let fixture: ComponentFixture<ArchiveElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
