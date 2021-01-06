import {
    AfterViewInit,
    Component,
    ElementRef, HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor, FormControl,
    FormGroup, NG_VALIDATORS,
    NgControl,
    ValidationErrors,
    Validator, ValidatorFn, Validators,
} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {AutoCompleteModel} from './auto-complete-model';
import {FocusMonitor} from "@angular/cdk/a11y";
import {debounceTime} from "rxjs/operators";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {coerceBooleanProperty} from "@angular/cdk/coercion";


@Component({
    selector: 'ss-auto-complete',
    templateUrl: './ui-auto-complete.component.html',
    styleUrls: ['./ui-auto-complete.component.scss'],
    providers: [
        {provide: MatFormFieldControl, useExisting: UiAutoCompleteComponent}
    ],
    // tslint:disable-next-line:no-host-metadata-property
    host: {
        '[id]': 'id'
    }
})
export class UiAutoCompleteComponent implements AfterViewInit, OnInit, ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.form.disable() : this.form.enable();
        this.stateChanges.next();
    }

    get value(): any {
        return this.form.value.value;
    }

    @Input()
    set value(value: any) {
        this.form.patchValue({value: value});
    }

    get descriptionValue(): any {
        return this.form.value.descriptionValue;
    }

    set descriptionValue(value: any) {
        this.form.patchValue({descriptionValue: value});
    }


    get errorState(): boolean {
        return this.form.invalid && this.form.touched;
    }


    get empty() {
        return !this.form.value.descriptionValue;
    }

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }


    constructor(public focusMonitor: FocusMonitor,
                protected elementRef: ElementRef<HTMLElement>,
                @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
                @Optional() @Self() public ngControl: NgControl) {

        this.ngControl.valueAccessor = this;

        const requiredValidator = this.required ? [Validators.required] : [];
        this.form = new FormGroup({
            descriptionValue: new FormControl({value: null, disabled: this.disabled}, requiredValidator),
            value: new FormControl({value: null, disabled: this.disabled}, requiredValidator),
        })

        this.focusMonitor.monitor(this.elementRef, true).subscribe(origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });

    }


    static nextId = 0;


    static ngAcceptInputType_disabled: boolean | string | null | undefined;
    static ngAcceptInputType_required: boolean | string | null | undefined;
    id = `ss-auto-complete-${UiAutoCompleteComponent.nextId++}`;


    form: FormGroup;

    @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;


    @Input()
    model: AutoCompleteModel<any>;

    @Input()
    descriptionFieldName = 'description';

    @Input()
    idOrFilterFieldName = 'id';

    @Input()
    filterParam = 'find';

    @Input()
    replaceIdWithFilter = false;

    private _placeholder: string;

    private _required = false;

    private _disabled = false;

    private _descriptionValue: any;

    stateChanges: Subject<void> = new Subject<void>();
    userAriaDescribedBy: string;


    data: any[] = [];
    searchChanges = new Subject<string>();
    focused = false;
    controlType = 'ss-autocomplete';
    isAnyOptionSelected;
    noMatchFound = false;

    readonly autofilled: boolean;

    ngOnInit(): void {
        this.ngControl.control.setValidators(this.validate.bind(this));
    }

    onChange = (_: any) => {
    };

    onTouched = () => {

    };



    ngAfterViewInit(): void {
        this.listenToSearch();
    }

    listenToSearch(): void {
        this.searchChanges.pipe(debounceTime(10)).subscribe((search: string) => {

            this.value = null;
            this.onChange(null);

            this.loadData(search).subscribe(loadedData => {
                this.data = loadedData;
                const fullMatch = this.findFullMatch(search);

                if (this.data.length === 0) {
                    this.noMatchFound = true;
                } else {
                    this.noMatchFound = false;
                    if (fullMatch !== null) {
                        this.changeValue(fullMatch[this.idOrFilterFieldName]);
                        this.autoComplete.closePanel();
                    } else {
                        this.autoComplete.openPanel();
                    }
                }


            });

        });
    }


    findFullMatch(search): {} {
        const index = this.data.length === 1 ? this.data.findIndex(x => x[this.descriptionFieldName] === search) : -1;
        return index > -1 ? this.data[index] : null;
    }

    private loadData(search: string) {
        return this.model.getDataByFilter(search)
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


    writeValue(idOrFilter: any): void {
        if (idOrFilter) {
            this.value = idOrFilter;
            this.displayDescription(idOrFilter);
        }
    }


    private displayDescription(value: any): void {
        const ob = this.replaceIdWithFilter ? this.model.getByFilter(this.filterParam, value) : this.model.getById(value);
        ob.subscribe(x => {
            this.descriptionValue = x[this.descriptionFieldName];
        });
    }

    changeValue(value): void {
        const index = this.data.findIndex(x => x[this.idOrFilterFieldName] === value);
        this.value = value
        this.descriptionValue = this.data[index][this.descriptionFieldName];
        this.onChange(this.value);
    }


    setDescribedByIds(ids: string[]) {
        // tslint:disable-next-line:no-non-null-assertion
        const controlElement = this.elementRef.nativeElement
            .querySelector('input')!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }


    ngOnDestroy() {
        this.searchChanges.complete();
        this.stateChanges.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }


    validate(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            console.log("**************");
            if (!this.descriptionValue && this.value === null && this.required) {
                return {required: {valid: false}};
            }

            if (this.descriptionValue && this.value === null) {
                return {validOption: {valid: false}}
            }

            return null;
        }
    }


    onContainerClick(event: MouseEvent): void {
    }

}

