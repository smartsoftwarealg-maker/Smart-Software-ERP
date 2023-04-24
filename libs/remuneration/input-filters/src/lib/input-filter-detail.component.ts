import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {InputFilter} from './input-filter-api';
import {ElementsInfo, ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {InputFiltersService} from './input-filters.service';
import {SelectionModel} from '@angular/cdk/collections';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'ss-input-filter-detail',
    templateUrl: './input-filter-detail.component.html',
    styleUrls: ['./input-filter-detail.component.scss']
})
export class InputFilterDetailComponent extends BaseEntityDetailComponent<InputFilter> {
    filter = new FormControl<string|null>('');

    elements: ElementsInfo[]         = [];
    filteredElements: ElementsInfo[] = [];
    selectionArray: string[]         = [];
    selection = '';

    constructor(
        private detailSrv: InputFiltersService,
        private elementSrv: ElementsInfoService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_INPUT_FILTERS');
    }

    public override setupForm(e: InputFilter): UntypedFormGroup {
        this.selection = e.selection;
        this.buildSelectionArray();
        return this.formBuilder.group({
            id: [e.id || 0],
            description: [e.description, Validators.required],
            selection: [e.selection || '', Validators.required],
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.elementSrv
            .getList(0, 2000)
            .subscribe(res => {
                this.elements = res.body
                    .sort((a, b) => a.description? a.description?.localeCompare(b.description) : -1);
                const searchText = this.filter.value || '';
                this.filteredElements = this.elements.filter(e => searchText === '' || e.description?.indexOf(searchText) >= 0);
                this.buildSelectionArray();
            });
        this.subscriptions.push(
            this.filter
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(value => this.filteredElements =
                this.elements.filter(e => e.description && (value === '' || e.description.toLowerCase().indexOf(value.toLowerCase()) >= 0)))
        );
    }

    addElements(sel: SelectionModel<any>) {
        this.selection = this.form.controls['selection'].value +
                         sel.selected
                             .map(e => e.value)
                             .filter(e => this.selection?.indexOf(e) < 0)
                             .join('');
        this.form.controls['selection'].setValue(this.selection);
        this.buildSelectionArray();
    }

    removeElements(sel: SelectionModel<any>) {
        const remove = sel.selected
            .map(e => e.value.substring(0, 4))
            .join('');
        this.selection = this.selection.replace(remove, '');
        this.form.controls['selection'].setValue(this.selection, {onlySelf: true, emitEvent: true});
        this.buildSelectionArray();
    }

    private buildSelectionArray() {
        this.selectionArray = this.selection?
            this.selection
            .split('e')
            .filter(e => e !== '')
            .map(e => `e${e} ${this.elements.find(f => f.field === 'e' + e)?.description || ''}`) :
        [];
    }

    override readForm(): InputFilter {
        const value = super.readForm();
        value.selection = this.selection;
        return value;
    }
}
