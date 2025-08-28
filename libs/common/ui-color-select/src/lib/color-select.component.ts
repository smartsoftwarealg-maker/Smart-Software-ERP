import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { LanguageService } from '@ss/common/api-common';

import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'ss-color-select',
    templateUrl: './color-select.component.html',
    styleUrls: ['./color-select.component.scss'],
    exportAs: 'colorSelect',
    standalone: true,
    imports: [MatMenuTrigger, MatIconButton, MatMenu]
})
export class ColorSelectComponent {

    @ViewChild('trigger', { static: false }) trigger: MatMenuTrigger;

    @Input() useIconOnly = false;
    @Input() selectedColor = -1; // selected index
    @Input() colorKey = '';
    @Input() classKey = '';
    @Output() change: EventEmitter<number> = new EventEmitter<number>();
    mColors: any[] = [];
    mColumnsCount = 3;
    mRowCount = 3;

    constructor(public langSrv: LanguageService) {
    }

    @Input()
    set colors(colors: any[]) {
        this.mColors = colors;
        this.updateRowCount();
    }

    @Input()
    set columnsCount(c: number) {
        this.mColumnsCount = c;
        this.updateRowCount();
    }

    updateRowCount() {
        this.mRowCount = this.mColors.length / this.mColumnsCount;
        if (this.mRowCount * this.mColumnsCount < this.mColors.length) {
            this.mRowCount++;
        }
    }

    @Input()
    set selectedColorObject(obj: any) {
        const selected = obj[this.colorKey];
        this.selectedColor = -1;
        if (this.mColors != null && obj != null) {
            for (let i = 0; i < this.mColors.length; i++) {
                if (selected === this.mColors[i][this.colorKey]) {
                    this.selectedColor = i;
                    break;
                }
            }
        }
    }

    selectColor(i: number) {
        this.selectedColor = i;
        this.change.emit(this.selectedColor);
    }

    public click(): void {
        this.trigger.toggleMenu();
    }

}
