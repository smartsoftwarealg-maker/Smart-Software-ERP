import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, DoCheck, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import {
    ControlValueAccessor,
    NgControl
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { isString, strToDate } from "@ss/common/api-common";
import { Subject } from 'rxjs';

@Component({
    selector: 'ss-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
        { provide: MatFormFieldControl, useExisting: DatePickerComponent }
    ]
})
export class DatePickerComponent implements MatFormFieldControl<Date>, DoCheck, OnInit, OnDestroy, ControlValueAccessor {

    constructor(
        @Optional() @Self() public ngControl: NgControl,
        private fm: FocusMonitor,
        private elRef: ElementRef<HTMLElement>
    ) {
        if (this.ngControl != null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
            if (this.focused && !origin) {
                if (this.textField.nativeElement.value) {
                    if (!strToDate(this.textField.nativeElement.value)) {
                        this.textField.nativeElement.value = null;
                    }
                }
                this.onTouched();
            }
            this.isFocused = !!origin;
            this.stateChanges.next();
        });
    }

    get value(): Date | null {
        return this.date;
    }

    @Input()
    set value(obj: Date) {
        this.writeValue(obj);
        this.onChange(this.date);
    }

    @Input()
    set placeholder(t: string) {
        this.pPlaceholder = t;
        this.stateChanges.next();
    }

    get placeholder(): string {
        return this.pPlaceholder;
    }

    get focused() { return this.isFocused; }

    /** Whether the control is empty. */
    get empty(): boolean {
        return !this.date;
    }

    /** Whether the `MatFormField` label should try to float. */
    //    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    get required(): boolean {
        return this.isRequired;
    };

    @Input()
    set required(b: boolean) {
        this.isRequired = b;
        this.stateChanges.next();
    }

    /** Whether the control is disabled. */

    get disabled(): boolean { return this.isDisabled; }

    @Input()
    set disabled(value: boolean) {
        this.isDisabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    static nextId = 0;

    noopx = (x?: any) => { };

    @ViewChild('textField', { static: true }) textField: ElementRef;
    onChange: (date: Date) => void = this.noopx;
    onTouched: () => void = this.noopx;

    /** The value of the control. */
    date: Date;

    /**
     * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
     * needs to run change detection.
     */
    readonly stateChanges = new Subject<void>();
    /** The element ID for this control. */
    @HostBinding() readonly id = `ss-date-picker-${DatePickerComponent.nextId++}`;

    /** The placeholder for this control. */
    pPlaceholder: string;

    /** Whether the control is focused. */
    isFocused = false;

    /** Whether the control is required. */
    isRequired = false;

    isDisabled: boolean;

    /** Whether the control is in an error state. */
    errorState = false;
    lastErrorState = false;

    /**
     * An optional name for the control type that can be used to distinguish `mat-form-field` elements
     * based on their control type. The form field will add a class,
     * `mat-form-field-type-{{controlType}}` to its root element.
     */
    readonly controlType: 'datepicker';
    /**
     * Whether the input is currently in an autofilled state. If property is not present on the
     * control it is assumed to be false.
     */
    readonly autofilled = false;
    /**
     * Value of `aria-describedby` that should be merged with the described-by ids
     * which are set by the form-field.
     */
    @Input('aria-describedby') userAriaDescribedBy: string;


    /** Sets the list of element IDs that currently describe this control. */
    setDescribedByIds(ids: string[]) {
    }

    /** Handles a click on the control's container. */
    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    }

    onKeyUp(txt: string): void {
        // 1-1-2000 is an example of the shortest valid date (8 chars)
        let value: Date = null;
        if (txt && txt.length > 8) {
            value = strToDate(txt);
        }
        this.onChange(value);
        this.stateChanges.next();
    }

    onDateChanged(d: Date) {
        this.writeValue(d);
        this.onChange(d);
    }

    // value accessor
    writeValue(obj: any): void {
        if (obj == null) {
            this.date = null;
        } else if (isString(obj)) {
            this.date = strToDate(obj as any);
        } else if (obj instanceof Date) {
            this.date = obj;
        } else {
            this.date = null;
        }
        this.stateChanges.next();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // life cycles bullshit
    ngDoCheck(): void {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched;
            if (this.lastErrorState !== this.errorState) {
                this.stateChanges.next();
                this.lastErrorState = this.errorState;
            }
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

}
