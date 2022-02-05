import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ss-archive-element',
  templateUrl: './archive-element.component.html',
  styleUrls: ['./archive-element.component.css']
})
export class ArchiveElementComponent {
  readonly MB = 1024 * 1024;
  readonly KB = 1024;
  @Input() description = '';
  @Input() id = 0;
  @Input() imgSrc: Observable<string> = of('./assets/img/Dummy.png');
  @Output() selected = new EventEmitter<number>();
  @Input() size = 0;
  @Input() editDate = '2018-01-07 10:00:00';
  @Input() checkSum: string = null;
  defImage = of('./assets/img/Dummy.png');


  constructor(private sanitizer: DomSanitizer) {}

  onSelect() {
    this.selected.emit(this.id);
  }

  docSize() {
      return this.size > this.MB ? (this.size / this.MB).toFixed(2) + 'MB' :
          this.size > this.KB ? (this.size / this.KB).toFixed(2) + 'KB' : this.size + 'B';

  }
}
