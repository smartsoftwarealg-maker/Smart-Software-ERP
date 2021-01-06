import {Component, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup} from "@angular/forms";


@Component({
    selector: 'ss-auto-complete',
    templateUrl: './ui-auto-complete.component.html',
    styleUrls: ['./ui-auto-complete.component.scss']
})
export class UiAutoCompleteComponent implements ControlValueAccessor {

    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            descriptionValue: new FormControl({value: null, disabled: this.disabled}, requiredValidator),
            value: new FormControl({value: null, disabled: this.disabled}, requiredValidator),
        })
    }

    get value(): any {
        return this.form.value.value;
    }

    @Input()
    set value(value: any) {
        this.form.patchValue({value: value});
    }


    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(idOrFilter: any): void {
        if (idOrFilter) {
            this.value = idOrFilter;
            this.displayDescription(idOrFilter);
        }
    }

    onChange = (_: any) => {
    };

    onTouched = () => {

    };

}

