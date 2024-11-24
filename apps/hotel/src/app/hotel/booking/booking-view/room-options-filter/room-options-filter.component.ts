import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BookingService } from '../../booking.service';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { LanguageService } from '@ss/common/api-common';
import { MatBadge } from '@angular/material/badge';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateDirective } from '../../../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { NgFor } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { TranslatePipe } from '../../../../../../../../libs/common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'app-room-options-filter',
    templateUrl: 'room-options-filter.component.html',
    styleUrls: ['room-options-filter.component.scss'],
    standalone: true,
    imports: [MatBadge, MatIconButton, MatTooltip, MatMenuTrigger, MatMenu, TranslateDirective, NgFor, MatCheckbox, MatMiniFabButton, TranslatePipe]
})
export class RoomOptionsFilterComponent {

    rOptions: number[] = [];
    checkedOptions: { [key: number]: boolean; } = {};
    @ViewChild('trigger', { static: false }) trigger: MatMenuTrigger;

    @Input()
    set options(rOptions: number[]) {
        this.checkedOptions = {};
        if (rOptions) {
            this.rOptions = rOptions;
            rOptions.forEach(o => this.checkedOptions[o] = true);
        } else {
            this.rOptions = [];
        }
    }

    @Output()
    apply = new EventEmitter<void>();

    constructor(public bookingSrv: BookingService, public langSrv: LanguageService) {
    }

    setOption(oid: number, checked: boolean) {
        if (checked) {
            this.checkedOptions[oid] = true;
        } else {
            delete this.checkedOptions[oid];
        }
    }

    close() {
        this.trigger.closeMenu();
    }

    applyChanges() {
        this.close();
        while (this.rOptions.length) {
            this.rOptions.pop();
        }
        for (const o in this.checkedOptions) {
            if (this.checkedOptions.hasOwnProperty(o)) {
                this.rOptions.push(+o);
            }
        }
        this.apply.emit();
    }
}
