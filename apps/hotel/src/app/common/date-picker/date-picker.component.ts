import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { dateTimeToStr, dateToStr, strToDate, strToDateTime } from '../util';
import { isString } from '@ss/common/api-common';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true,
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor, Validator {

    pMin: Date;
    pMax: Date;
    pDate: Date;
    pOff = false;
    private propagateChange = this.defaultPropagateChange;
    private onTouched = this.defaultPropagateChange;
    value: Date;
    pValidYears: number[];

    isEmpty = true;
    isValid = true;

    wasTouched = false;

    @ViewChild('element', { static: false }) element: ElementRef;

    @Output() dateStrChanged = new EventEmitter<string>();
    @Output() dateChanged = new EventEmitter<Date>();

    @Input()
    required: boolean;

    @Input()
    name: string;

    @Input()
    hasTime = false;

    private propagateValidationChange: () => void = () => this.validate(null);

    @Input()
    set minDate(d: Date) {
        this.pMin = d;
        this.testValidity();
        this.propagateValidationChange();
    }

    @Input()
    set maxDate(d: Date) {
        this.pMax = d;
        this.testValidity();
        this.propagateValidationChange();
    }

    @Input()
    set validYears(n: number[]) {
        this.pValidYears = n;
        this.testValidity();
        this.propagateValidationChange();
    }

    @Input()
    set minDateStr(d: string) {
        this.pMin = this.hasTime ? strToDateTime(d) : strToDate(d);
        this.testValidity();
        this.propagateValidationChange();
    }

    @Input()
    set maxDateStr(d: string) {
        this.pMax = this.hasTime ? strToDateTime(d) : strToDate(d);
        this.testValidity();
        this.propagateValidationChange();
    }

    @Input()
    set dateStr(dateStr: string) {
        if (this.hasTime) {
            this.pDate = strToDateTime(dateStr);
        } else {
            this.pDate = strToDate(dateStr);
        }
        this.value = this.pDate;
        this.testValidity();
        this.propagateValidationChange();
    }

    @Input()
    set date(date: Date) {
        this.pDate = date;
        this.value = this.pDate;
        this.testValidity();
        this.propagateValidationChange();
    }

    @Input()
    set disabled(b: boolean) {
        this.pOff = b;
        this.propagateValidationChange();
    }

    markAsTouched() {
        this.onTouched();
        this.wasTouched = true;
        this.propagateValidationChange();
    }

    onDateOnlyChanged(date: Date) {
        date.setHours(this.getHours());
        date.setMinutes(this.getMinutes());
        date.setSeconds(0);
        this.onDateChanged(date);
    }

    onDateChanged(date: Date) {
        // this.pDate = date;
        let str: string;
        if (this.hasTime) {
            str = dateTimeToStr(date);
        } else {
            str = dateToStr(date);
        }
        this.isEmpty = str == null;
        this.value = date;
        this.testValidity();
        this.propagateChange(str);
        this.dateStrChanged.emit(str);
        this.dateChanged.emit(date);
        this.propagateValidationChange();
    }

    getHours(): number {
        return this.value ? this.value.getHours() : null;
    }

    getMinutes(): number {
        return this.value ? this.value.getMinutes() : null;
    }

    onHoursChanged(event) {
        let n = event.target.value;
        if (isString(n)) {
            n = +n;
        }
        if (Number.isNaN(n)) {
            n = 0;
            event.target.value = 0;
        } else if (n < 0) {
            n = 0;
            event.target.value = 0;
        } else if (n > 23) {
            n = 23;
            event.target.value = 23;
        }
        if (!this.value) {
            this.value = new Date();
            this.value.setHours(n);
            this.onDateChanged(this.value);
        } else {
            if (this.value.getHours() !== n) {
                this.value.setHours(n);
                this.onDateChanged(this.value);
            }
        }
    }

    onMinutesChanged(event) {
        let n = event.target.value;
        if (isString(n)) {
            n = +n;
        }
        if (Number.isNaN(n)) {
            n = 0;
            event.target.value = 0;
        } else if (n < 0) {
            n = 0;
            event.target.value = 0;
        } else if (n > 59) {
            n = 59;
            event.target.value = 59;
        }
        if (!this.value) {
            this.value = new Date();
            this.value.setMinutes(n);
            this.onDateChanged(this.value);
        } else {
            if (this.value.getMinutes() !== n) {
                this.value.setMinutes(n);
                this.onDateChanged(this.value);
            }
        }
    }

    testValidity(): void {
        if (!this.pValidYears || this.value == null) {
            this.isValid = true;
        } else {
            const year = this.value.getFullYear();
            this.isValid = this.pValidYears.filter(y => y === year).length !== 0;
            if (!this.isValid) {
                return;
            }
        }
        if (this.pMin && this.value && this.value.getTime() < this.pMin.getTime()) {
            this.isValid = false;
            return;
        }
        if (this.pMax && this.value && this.pMax.getTime() < this.value.getTime()) {
            this.isValid = false;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.pOff = isDisabled;
    }

    writeValue(obj: any): void {
        if (obj == null) {
            this.isEmpty = true;
        } else {
            if (obj instanceof Date) {
                this.pDate = obj;
                this.isEmpty = false;
            } else { // must be a string
                const str: string = obj + '';
                if (this.hasTime) {
                    this.pDate = strToDateTime(str);
                } else {
                    this.pDate = strToDate(str);
                }
                this.isEmpty = this.pDate == null;
            }
        }
        this.value = this.pDate;
        this.testValidity();
        this.propagateValidationChange();
    }

    defaultPropagateChange(_?: any) {
    }

    registerOnValidatorChange(fn: () => void): void {
        this.propagateValidationChange = fn;
    }

    validate(control: AbstractControl): ValidationErrors {
        if ((this.isEmpty && this.required)) {
            return {
                required: { valid: false }
            };
        }
        this.testValidity();
        if (!this.isValid) {
            return {
                range: { valid: false }
            };
        }
        // if (control) {
        //     control.setErrors(null);
        // }
        return null;
    }

    /*
        patchValue(value: any, options?: Object): void {
            this.writeValue(value);
        }
        reset(value?: any, options?: Object): void {
            this.writeValue(value);
        }
        setValue(value: any, options?: Object): void {
            this.writeValue(value);
        }
    */

}
