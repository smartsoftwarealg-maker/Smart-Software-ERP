import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'ss-hour-picker',
    templateUrl: './hour-picker.component.html',
    styleUrls: ['./hour-picker.component.scss'],
})
export class HourPickerComponent {
    @Output('hour') eventEmitter = new EventEmitter<number>();
    step = 2;
    mode = 12;
    hourControl = new FormControl<number>(1);

    onStep(e: any) {
        this.step = e.value;
    }

    hourChanged(v: any) {
        this.eventEmitter.emit(+v)
    }

}
