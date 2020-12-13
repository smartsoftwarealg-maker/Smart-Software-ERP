import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
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
    ControlValueAccessor,
    FormGroup,
    NgControl,
    ValidationErrors,
    Validator,
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
    host: {
        '[id]': 'id'
    }
})
export class UiAutoCompleteComponent implements OnInit, AfterViewInit, Validator, ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {

    static nextId = 0;
    id = `ss-auto-complete-${UiAutoCompleteComponent.nextId++}`;


    @ViewChild('form') form: FormGroup;

    @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;


    @Input()
    model: AutoCompleteModel<any>;

    @Input()
    descriptionFieldName: string = 'description';

    @Input()
    idOrFilterFieldName: string = 'id';

    @Input()
    filterParam: string = 'find';

    @Input()
    replaceIdWithFilter = false;

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    private _placeholder: string;

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.form.disable() : this.form.enable();
        this.stateChanges.next();
    }

    private _disabled = false;

    @Input()
    value: any;

    descriptionValue: any;


    get errorState(): boolean {
        return this.ngControl.errors !== null && !!this.ngControl.touched;
    }

    stateChanges: Subject<void> = new Subject<void>();
    userAriaDescribedBy: string;


    data: any[] = [];
    searchChanges = new Subject<string>();
    focused = false;
    controlType = 'ss-autocomplete';
    isAnyOptionSelected;
    noMatchFound: boolean = false;

    onChange = (_: any) => {
    };

    onTouched = () => {
    };

    onValidator = () => {
        console.log("test");
    }


    get empty() {
        return !this.form || !this.form.value.search;
    }

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @HostListener('keyup')
    onSearchChange(noMatchFound$event: KeyboardEvent): void {
        this.searchChanges.next(this.form.value.search);
        this.stateChanges.next();
    }


    constructor(public focusMonitor: FocusMonitor,
                protected elementRef: ElementRef<HTMLElement>,
                @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
                @Optional() @Self() public ngControl: NgControl) {

        this.ngControl.valueAccessor = this;

        this.focusMonitor.monitor(this.elementRef, true).subscribe(origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });

    }


    ngOnInit(): void {
        this.ngControl.control.setValidators([this.validate.bind(this)]);
    }

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
        const index = this.data.length == 1 ? this.data.findIndex(x => x[this.descriptionFieldName] === search) : -1;
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

    registerOnValidatorChange(fn: () => void): void {
        this.onValidator = fn;
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
            console.log(x);
            this.descriptionValue = x[this.descriptionFieldName];
        });
    }

    get searchFormControl() {
        return this.form.controls.search;
    }

    changeValue(value): void {
        const index = this.data.findIndex(x => x[this.idOrFilterFieldName] === value);
        this.value = value
        this.descriptionValue = this.data[index][this.descriptionFieldName];
        this.onChange(this.value);
    }


    setDescribedByIds(ids: string[]) {
        const controlElement = this.elementRef.nativeElement
            .querySelector('input')!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }



    static ngAcceptInputType_disabled: boolean | string | null | undefined;
    static ngAcceptInputType_required: boolean | string | null | undefined;

    readonly autofilled: boolean;


    ngOnDestroy() {
        this.searchChanges.complete();
        this.stateChanges.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (!this.descriptionValue && this.value === null && this.required) {
            return {required: {valid: false}};
        }

        if (this.descriptionValue && this.value === null) {
            return {validOption: {valid: false}}
        }

        return null;
    }


    onContainerClick(event: MouseEvent): void {
    }

}

