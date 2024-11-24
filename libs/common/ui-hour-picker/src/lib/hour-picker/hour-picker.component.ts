import {Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';

@Component({
    selector: 'ss-hour-picker',
    templateUrl: './hour-picker.component.html',
    styleUrls: ['./hour-picker.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatFormField,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatRadioGroup,
        MatRadioButton,
    ],
})
export class HourPickerComponent {
    @Output('hour') eventEmitter = new EventEmitter<number>();
    step = 2;
    mode = 12;
    hourControl = new FormControl<number>(0);

    onStep(e: any) {
        this.step = e.value;
    }

    hourChanged(v: any) {
        this.eventEmitter.emit(+v)
    }

}
