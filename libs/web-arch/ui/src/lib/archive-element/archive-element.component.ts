import { Component, EventEmitter, input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-archive-element',
    templateUrl: './archive-element.component.html',
    styleUrls: ['./archive-element.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class ArchiveElementComponent {
    readonly MB = 1024 * 1024;
    readonly KB = 1024;
    description = input('');
    id = input(0);
    imgSrc = input<Observable<string>>(of('./assets/img/Dummy.png'));
    @Output() selected = new EventEmitter<number>();
    size = input(0);
    editDate = input('2018-01-07 10:00:00');
    checkSum = input<string>(null);
    defImage = of('./assets/img/Dummy.png');

    constructor(private sanitizer: DomSanitizer) {}

    onSelect() {
        this.selected.emit(this.id());
    }

    docSize() {
        return this.size() > this.MB
            ? (this.size() / this.MB).toFixed(2) + 'MB'
            : this.size() > this.KB
              ? (this.size() / this.KB).toFixed(2) + 'KB'
              : this.size + 'B';
    }
}
