import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, DoCheck, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldControl } from '@angular/material/form-field';
import { isString } from '@ss/common/api-common';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AutoCompleteModel, Id } from './auto-complete-model';

@Component({
    selector: 'ss-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss'],
    providers: [
        { provide: MatFormFieldControl, useExisting: UiAutoCompleteComponent }
    ]
})
export class UiAutoCompleteComponent implements ControlValueAccessor, MatFormFieldControl<Id>, DoCheck, OnInit, OnDestroy {

    static nextId = 0;

    constructor(
        @Optional() @Self() public ngControl: NgControl,
        private fm: FocusMonitor,
        private elRef: ElementRef<HTMLElement>) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.isFocused = !!origin;
            this.stateChanges.next();
        });
    }

    readonly stateChanges = new Subject<void>();
    autoControl: FormControl = new FormControl();
    filterSub: Subscription;
    @HostBinding() readonly id = `ss-auto-complete-${UiAutoCompleteComponent.nextId++}`;
    isRequired = false;
    errorState = false;
    lastErrorState = false;
    pPlaceholder: string;
    readonly controlType: 'ssAutoComplete';
    readonly autofilled = false;
    isFocused: boolean = false;
    isDisabled: boolean;
    selected: Id;
    loading = false;
    //
    @Input()
    model: AutoCompleteModel<any>;

    get value(): Id {
        return this.selected;
    }

    @Input()
    set value(selected: Id) {
        this.setValue(selected, true);
    }

    setValue(v: Id, fireOnChange: boolean) {
        console.log('setValue ' + v);
        if (!!this.model && !!v) {
            // possibilites:
            // the value is null
            // the value is in cache
            // the value is in options
            // the value does not exist
            if (v == null) {
                this.selected = null;
                if (fireOnChange) {
                    this.onChange(this.selected);
                }
                this.autoControl.setValue(null);
            } else if (this.model.valueOf(this.model.cache) === v) {
                console.log('setValue taking string from cache');
                this.selected = v;
                this.autoControl.setValue(this.model.cache);
                this.model.options = [this.model.cache];
                if (fireOnChange) {
                    this.onChange(this.selected);
                }
            } else if (this.displayValueFromOptions(v)) {
                console.log('setValue taking string from options');
                if (fireOnChange) {
                    this.onChange(this.selected);
                }
            } else {
                console.log('setValue loading value by id');
                this.autoControl.setValue(null);
                this.loadValue(v, () => {
                    if (fireOnChange) {
                        this.onChange(this.selected);
                    }
                });
            }
        } else {
            console.log('setValue (model is null) OR (value is null)');
            this.selected = null;
            if (fireOnChange) {
                this.onChange(this.selected);
            }
        }
        this.stateChanges.next();
    }

    displayValueFromOptions(v: Id): boolean {
        if (this.model && this.model.options) {
            const e = this.model.options.filter(o => this.model.valueOf(o) === v);
            if (e.length == 1) {
                this.model.cache = e[0];
                this.selected = v;
                this.model.options = e;
                this.autoControl.setValue(e[0]);
                return true;
            }
        }
        return false;
    }

    loadValue(value: Id, runnable: () => void) {
        if (this.model) {
            this.loading = true;
            this.model
                .getById(value)
                .subscribe(e => {
                    console.log('loaded =', e);
                    this.model.cache = e;
                    this.model.options = [e];
                    this.selected = value;
                    this.autoControl.setValue(e);
                    runnable();
                    this.loading = false;
                }, e => {
                    this.loading = false;
                    throw e;
                });
        } else {
            throw new Error('Auto complete model is null');
        }
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

    get empty(): boolean {
        return !this.autoControl.value;
    }

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

    get disabled(): boolean { return this.isDisabled; }

    @Input()
    set disabled(value: boolean) {
        this.isDisabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input('aria-describedby') userAriaDescribedBy: string;

    setDescribedByIds(ids: string[]) {
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() != 'input') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    }

    // ControlValueAccessor

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(id: any): void {
        this.setValue(id, false);
    }

    onChange = (a: any) => {
    };

    onTouched = () => {
    };

    // Life cycles (birth, spreading currption in the land, death, hell)
    ngDoCheck(): void {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched;
            if (this.lastErrorState != this.errorState) {
                this.stateChanges.next();
                this.lastErrorState = this.errorState;
            }
        }
    }

    ngOnInit() {
        this.filterSub = this.autoControl.valueChanges.pipe(
            filter(txt => isString(txt)),
            filter(txt => txt !== this.model.toString(this.model.cache)), // break the loop.
            tap(() => {
                this.model.cache = null;
                this.model.options = [];
                this.setValue(null, true);
                this.stateChanges.next();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(txt => {
                if (this.loading) {
                    throw new Error("Was loading already");
                }
                console.log('filter = ' + txt);
                this.loading = true;
                return txt == null ? of([]) : this.model.filter(txt);
            })
        ).subscribe(
            options => { this.model.options = options; this.loading = false; },
            err => { this.model.options = []; this.loading = false; throw err; }
        );
    }

    ngOnDestroy() {
        this.filterSub.unsubscribe();
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    // auto compelete crap

//    getByValue(i: Id) {
//        return !!this.model && !!this.model.options
//            ? this.model.options.filter(x => this.model.valueOf(x) === i)[0]
//            : null;
//    }

    displayFn = x => {
        return this.model ? this.model.toString(x) : null
    };

    optionSelected(event: MatAutocompleteSelectedEvent) {
        this.setValue(this.model.valueOf(event.option.value), true);
    }
}

