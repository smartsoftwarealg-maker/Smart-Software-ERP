import {Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject, Subscription} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
    selector: 'ss-paymonth-editor',
    templateUrl: './paymonth-editor.component.html',
    providers: [{provide: MatFormFieldControl, useExisting: PaymonthEditorComponent}],
    styleUrls: ['./paymonth-editor.component.scss']
})
export class PaymonthEditorComponent implements MatFormFieldControl<number>, OnDestroy, ControlValueAccessor {
    static nextId = 0;
    focused = false;
    touched = false;
    form: FormGroup = null;
    stateChanges = new Subject<void>();
    onChangeSubscription: Subscription = null;
    onTouched = () => {};
    private _required = false;
    private _placeholder: string;
    _disabled: boolean = false;
    controlType = 'ss-paymonth-input';
    autofilled?: boolean;
    @Input('aria-describedby') userAriaDescribedBy: string;
    @HostBinding() id = `ss-paymonth-editor-${PaymonthEditorComponent.nextId++}`;

    constructor(private fb: FormBuilder,
                protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
                @Optional() @Self() public ngControl: NgControl) {
        this.form = fb.group({
            month: [0, [Validators.required, Validators.max(12), Validators.min(1)]],
            year: [0, [Validators.required, Validators.max(3000), Validators.min(1900)]],
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    writeValue(obj: any): void {
        if (typeof obj === 'number') {
            this.value = obj;
        }
    }
    registerOnChange(fn: (v:number) => any): void {
        this.onChangeSubscription = this.form.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }



    @Input()
    get value(): number {
        const v = this.form.value;
        return v.month + v.year * 100;
    }

    set value(paymonth: number) {
        this.form.controls['month'].setValue(paymonth % 100);
        this.form.controls['year'].setValue(+(paymonth / 100).toFixed(0));
    }

    @Input()
    get placeholder() {
        return this._placeholder;
    }

    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.onChangeSubscription?.unsubscribe();
    }

    onFocusIn(event: FocusEvent) {
        if (!this.focused) {
            this.focused = true;
            this.stateChanges.next();
        }
    }

    onFocusOut(event: FocusEvent) {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
            this.touched = true;
            this.focused = false;
            this.onTouched();
            this.stateChanges.next();
        }
    }


    get empty() {
        let n = this.form.value;
        return !n.month && !n.year;
    }

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    get required() {
        return this._required;
    }
    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.form.disable() : this.form.enable();
        this.stateChanges.next();
    }

    get errorState(): boolean {
        const value = this.form.value;
        return (!(value.month >= 1 && value.month <= 12 && value.year >= 1900 && value.year < 3000) ||
                this.form.invalid)
            && this.touched;
    }

    setDescribedByIds(ids: string[]) {
        const controlElement = this._elementRef.nativeElement
            .querySelector('.example-tel-input-container')!;
        controlElement?.setAttribute('aria-describedby', ids.join(' '));
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() != 'input') {
            this._elementRef.nativeElement.querySelector('input').focus();
        }
    }
}
