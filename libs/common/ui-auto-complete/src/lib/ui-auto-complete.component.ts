import {
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
    FormBuilder,
    FormGroup,
    NgControl,
    ValidationErrors
} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {Subject} from "rxjs";
import {AutoCompleteModel} from './auto-complete-model';
import {FocusMonitor} from "@angular/cdk/a11y";
import {debounceTime} from "rxjs/operators";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";


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
export class UiAutoCompleteComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {


    data: any[];

    @Input()
    model: AutoCompleteModel<any>;

    @Input()
    descriptionFieldName: string = 'description';

    @Input()
    idFieldName: string = 'id';

    static nextId = 0;

    isAnyOptionSelected = false;

    //

    container: FormGroup;
    @ViewChild('search') searchInput: HTMLInputElement;
    @ViewChild(MatAutocompleteTrigger) matAutocomplete: MatAutocompleteTrigger;


    stateChanges = new Subject<void>();
    searchChanges = new Subject<string>();
    focused = false;
    controlType = 'ss-autocomplete';
    id = `ss-auto-complete-${UiAutoCompleteComponent.nextId++}`;

    match = true;

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
        this.searchInput.disabled = this._disabled;
        this.stateChanges.next();
    }

    private _disabled = false;


    @Input()
    get value(): any {
        return this._value;
    }

    set value(id: any) {
        this._value = id;
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.ngControl.errors !== null && !!this.ngControl.touched;
    }

    private _value: any;

    onChange = (_: any) => {
    };

    onTouched = () => {
    };

    displayWith = (value: any) => value ? value[this.descriptionFieldName] : null;


    get empty() {
        return !this.container.value.search;
    }

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }


    constructor(public formBuilder: FormBuilder,
                public focusMonitor: FocusMonitor,
                protected elementRef: ElementRef<HTMLElement>,
                @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
                @Optional() @Self() public ngControl: NgControl) {

        this.container = this.formBuilder.group({
            search: [],
        });

        this.ngControl.valueAccessor = this;

        this.focusMonitor.monitor(this.elementRef, true).subscribe(origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });

    }


    @HostListener('keyup', ['$event'])
    handleKeyboardEvent($event: KeyboardEvent) {
        this.searchChanges.next(this.container.value.search);
    }

    ngOnInit(): void {
        this.ngControl.control.setValidators([this.validate.bind(this)]);
        this.ngControl.control.updateValueAndValidity();
        this.listenToSearch();
    }


    listenToSearch(): void {
        this.searchChanges.pipe(debounceTime(400)).subscribe((search: string) => {

            this.isAnyOptionSelected = false;

            this.loadData(search).subscribe(loadedData => {

                this.data = loadedData;

                this.handleEmptyData();

                this.handleFullMatch(search);
            });

        });

    }


    private handleEmptyData() {
        if (this.data.length === 0) {
            this.match = false;
        }
    }


    private handleFullMatch(search): void {
        const fullMatch = this.findFullMatch(search);
        if (fullMatch !== null) {
            this.changeValue(fullMatch[this.idFieldName]);
            this.isAnyOptionSelected = true;
            this.matAutocomplete.closePanel();
        }
    }

    findFullMatch(search): {} {
        const index = this.data.findIndex(x => x[this.descriptionFieldName] === search)
        return index > -1 ? this.data[index] : null;
    }

    private loadData(search: string) {
        this.match = true;
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


    writeValue(id: any): void {
        this.value = id;
        this.displayDescription(id);
    }


    private displayDescription(id: any): void {
        if (id != null) {
            this.model.getById(id)
                .subscribe(x => this.searchFormControl.setValue(x[this.descriptionFieldName]))
        }
    }

    get searchFormControl() {
        return this.container.controls.search;
    }

    changeValue(id): void {
        this.value = id;
        this.onChange(id);
    }

    panelClosed() {
        if (!this.isAnyOptionSelected) {
            // canceled
            this.changeValue(null);
        }
    }

    panelOpened() {
        this.isAnyOptionSelected = this.findFullMatch(this.container.value.search) != null;
    }

    setDescribedByIds(ids: string[]) {
        const controlElement = this.elementRef.nativeElement
            .querySelector('.input-container')!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }

    onContainerClick() {
        this.focusMonitor.focusVia(this.searchInput, 'program');
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
        if (this.empty && this.required) {
            return {required: {valid: false}};
        }

        if (this.value === null && !this.empty) {
            return {validOption: {valid: false}}
        }

        return null;
    }

}

