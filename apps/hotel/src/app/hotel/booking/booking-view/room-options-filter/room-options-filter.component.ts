import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BookingService } from '../../booking.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'app-room-options-filter',
    templateUrl: 'room-options-filter.component.html',
    styleUrls: ['room-options-filter.component.scss']
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
