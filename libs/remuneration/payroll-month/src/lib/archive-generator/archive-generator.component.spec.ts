import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveGeneratorComponent } from './archive-generator.component';

describe('ArchiveGeneratorComponent', () => {
  let component: ArchiveGeneratorComponent;
  let fixture: ComponentFixture<ArchiveGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
