import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {LoadingState} from '../util';
import { AbstractControl, ControlValueAccessor, UntypedFormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModel} from './auto-complete-model';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutoCompleteComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AutoCompleteComponent),
            multi: true,
        }
    ],
    standalone: true,
    imports: [MatFormField, MatLabel, NgIf, MatInput, FormsModule, MatAutocompleteTrigger, ReactiveFormsModule, MatAutocomplete, NgFor, MatOption]
})
export class AutoCompleteComponent implements OnInit, OnDestroy, Validator, ControlValueAccessor {

    options: any[] = [];
    control = new UntypedFormControl();
    loadingState: LoadingState = LoadingState.COMPLETE;
    subscription: Subscription;
    @Input() required = false;
    @Input() model: AutoCompleteModel<any, any>;
    //
    onChange: (a: any) => void = null;
    onTouched: () => void = null;
    onValidatorChange: () => void = null;

    constructor() {
    }

    @Input() set selected(v: any) {
        this.writeValue(v);
    }

    @Input() set disabled(b: boolean) {
        this.setDisabledState(b);
    }

    ngOnInit(): void {
        this.subscription = this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(filter => {
            this.filter(filter);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.model = null;
    }

    // events:
    onLeave() {
        if (!this.model || this.model.getSelectedId() == null) {
            this.control.setValue(null);
        }
        this.fireTouched();
    }

    filter(filter: string): void {
        if (!filter) {
            this.select(null);
            this.options = [];
            return;
        }
        if (this.model && this.model.getSelectedObject()) {
            if (filter === this.model.toString(this.model.getSelectedObject())) {
                // just in case, reset the list
                this.options = [this.model.getSelectedObject()];
                return; // the filter = the current object. don't do shit.
            }
        }
        if (this.model.getSelectedId()) {
            this.select(null);
        }
        if (this.model && filter && filter.length > 0) {
            this.options = this.model.filterArray(filter, this.options);
            this.loadingState = LoadingState.LOADING;
            this.model.filter(filter)
                .subscribe(options => {
                    this.options = options;
                    this.loadingState = LoadingState.COMPLETE;
                });
        }
    }

    toStringFn(obj: any): string {
        if (this.model) {
            return this.model.toString(obj);
        }
        return obj;
    }

    select(obj: any): void {
        if (this.model) {
            if (obj == null || !this.model.isId(obj)) {
                if (this.model.getSelectedId() !== obj) {
                    this.options = [obj].filter(a => a != null);
                    this.model.selectAndFireEvent(obj);
                    this.fireChanged();
                }
            } else {
                throw new Error('select Only Takes Valid Objects, not ids (ask Muaaz.h.is@gmail.com)');
            }
        }
    }

    fireChanged(): void {
        if (this.onChange) {
            this.onChange(this.model.getSelectedId());
        }
        this.fireValidatorChanged();
    }

    fireTouched() {
        if (this.onTouched) {
            this.onTouched();
        }
        this.fireValidatorChanged();
    }

    fireValidatorChanged() {
        if (this.onValidatorChange) {
            this.onValidatorChange();
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.fireValidatorChanged();
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.disabled || !this.required || (this.required && this.model && this.model.getSelectedId())) {
            return null;
        }
        return {
            required: {
                valid: false
            }
        };
    }

    writeValue(obj: any): void {
        if (this.model) {
            this.model.select(obj, x => {
                this.control.setValue(this.model.toString(x));
                this.options = [obj].filter(c => c != null);
                this.fireValidatorChanged();
            });
        }
    }

}

