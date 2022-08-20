import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {
    AbstractControl,
    ControlValueAccessor,
    UntypedFormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'app-tag-input',
    templateUrl: './tag-input.component.html',
    styleUrls: ['./tag-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TagInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TagInputComponent),
            multi: true,
        }
    ]

})
export class TagInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {

    readonly separatorKeysCodes: number[] = [ENTER];

    valid = true; // last result of validation
    loading = false;
    txtCtrl = new UntypedFormControl();
    elements: any[] = [];
    filtered: any[] = [];

    propagateChange = this.defaultPropagateChange;
    propagateValidationChange = this.defaultPropagateChange;
    @Input() required = false;
    @Input() getterFn = this.defGetter.bind(this);
    @Input() setterFn = this.defSetter.bind(this);
    @Output() remove = new EventEmitter<any>();
    @Output() add = new EventEmitter<any>();
    @Input() acToStringFn = null;
    @Input() chipToStringFn = null;
    @Input() filterFn = this.defFilter.bind(this);
    @ViewChild('txtInput', { static: false }) txtInput: ElementRef<HTMLInputElement>;
    @Input() areEqualFn = this.areEqual.bind(this);

    subscription: Subscription;

    constructor(public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.subscription = this.txtCtrl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap<any, any[]>((filter: string | null) => this.filterFn(filter))
        ).subscribe(list => {
            this.filtered = list;
        });
    }

    ngAfterViewInit(): void {
        this.txtInput.nativeElement.onblur = () => {
            this.propagateValidationChange();
        };
    }

    ngOnDestroy(): void {
        // todo: unsubscribe from other shit
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    @Input() set selected(a: any[]) {
        this.loading = true;
        this.elements = [];
        if (a == null) {
            this.loading = false;
            return;
        }
        a.forEach(x => this.setterFn(x).subscribe(r => {
            this.elements.push(r);
            if (this.elements.length === a.length) {
                this.loading = false;
            }
        }));
    }

    onRemove(x: any) {
        this.elements = this.elements.filter(e => !this.areEqualFn(e, x));
        this.remove.emit(this.getterFn(x));
        this.propagateChange(this.elements.length ? this.elements : null);
        if (this.elements.length < 1) {
            this.propagateValidationChange();
        }
    }

    onAdd(x: any) {
        const wasEmpty = this.elements.length === 0;
        if (this.elements.filter(e => this.areEqualFn(e, x)).length) {
            return;
        }
        this.elements.push(x);
        this.add.emit(this.getterFn(x));
        this.propagateChange(this.elements.length ? this.elements : null);
        if (wasEmpty && this.elements.length > 0) {
            this.propagateValidationChange();
        }
    }

    areEqual(a: any, b: any) {
        return a === b;
    }

    chipElementToString(x: any): string {
        if (this.chipToStringFn) {
            return this.chipToStringFn(x);
        }
        return x + '';
    }

    optionElementToString(x: any) {
        if (this.acToStringFn) {
            return this.acToStringFn(x);
        }
        return x + '';
    }

    onSelection(event: MatAutocompleteSelectedEvent): void {
        this.txtInput.nativeElement.value = '';
        this.onAdd(event.option.value);
    }

    // onTokenEnd(event: MatChipInputEvent): void {
    //     // Add fruit only when MatAutocomplete is not open
    //     // To make sure this does not conflict with OptionSelected Event
    //     // if (!this.matAutocomplete.isOpen) {
    //     // const input = event.input;
    //     // const value = event.value;
    //
    //     // Add shit
    //     // if ((value || '').trim()) {
    //     //     this.elements.push(value.trim());
    //     // }
    //
    //     // Reset the input value
    //     // if (input) {
    //     //     input.value = '';
    //     // }
    //
    //     // }
    // }

    defFilter(): Observable<any[]> {
        return of([]);
    }

    defGetter(obj: any): any {
        return obj;
    }

    defSetter(obj: any) {
        //        return of(obj);
        return {
            subscribe: (fn) => fn(obj)
        };
    }

    // overridden crap

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.elements.length === 0 && this.required) {
            this.valid = !this.txtCtrl.touched;
            return {
                required: {
                    valid: false,
                },
            };
        }
        control.setErrors(null);
        this.valid = true;
        return undefined;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    defaultPropagateChange(_?: any) {
    }

    registerOnValidatorChange(fn: () => void): void {
        this.propagateValidationChange = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        this.elements = obj == null ? [] : obj;
    }
}
