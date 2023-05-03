import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ELine, MJournal, PaymentElement} from './elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {HttpService, PaginatorPersistenceService} from '@ss/common/api-common';
import {ElementsEntryService} from './elements-entry.service';
import {Observable, of, switchMap, tap} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {MatSelectChange} from '@angular/material/select';
import {EmployeeService} from '@ss/payroll/api-employee';
import {ImageModel} from '@ss/common/ui-image-input';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {CommonElementsService} from './common-elements.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-elements-entry-list',
    templateUrl: './elements-entry-list.component.html',
    styleUrls: ['./elements-entry-list.component.scss', './common-css.scss']
})
export class ElementsEntryListComponent extends BaseEntityListComponent<ELine> implements OnInit {
    private readonly JOURNAL_IDX = 3;
    private FIXED_COLS = ['photo', 'id', 'firstName', 'lastName', 'post'];
    private FIXED_JOURNAL_HEADERS = ['id', 'firstName', 'lastName'];

    commonElementsLookup = new DefaultAutoCompleteModel(this.commonFieldSrv, 'field');
    form: UntypedFormGroup = null;
    selectedTabIndex = 0;
    mainTableWidth = 900;
    slipTableWidth = 500;

    slipColumns      = ['description', 'base', 'rate', 'gain', 'deduction'];
    displayedColumns = ['photo', 'id', 'firstName', 'lastName', 'post'];
    journalColumns = this.FIXED_JOURNAL_HEADERS;

    paySlip: PaymentElement[] = [];
    journalData: MJournal[] = [];
    headers: string[] = [];

    constructor(
        public infoSrv: ElementsEntryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
        private employeeSrv: EmployeeService,
        private httpSrv: HttpService,
        private monthSelectorSrv: PayrollMonthService,
        private formBuilder: UntypedFormBuilder,
        private commonFieldSrv: CommonElementsService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMENTS_ENTRY');
        this.pagination.pageSize = 10;
        this.form = this.formBuilder.group( {
            field: [''],
            value: [0.0]
        });
    }

    override getPage(): Observable<ELine[]> {
        const mode = this.infoSrv.selectionMode === 1? 'false' : 'true';
        const extraPrams = new HttpParams().set('input', this.infoSrv.selectedInput).set('fixed', mode);
        return this.infoSrv.selectedInput == 0 ? of([]) : this.infoSrv.getPage(this.pagination, this.filter, this.filter, extraPrams);
    }

    override processLoadedData(data: ELine[]): Observable<ELine[]> {
        this.infoSrv.loadDataCols();
        const colList = this.infoSrv.colsList();
        this.mainTableWidth = 900 + 120 * colList.length;
        this.displayedColumns = this.FIXED_COLS.concat(colList);

        const res = data.map(e => {
            e.imageModel = new ImageModel(this.httpSrv);
            e.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(e.id));
            e.imageModel.readOnly = true;
            return e;
        });
        return of(res);
    }

    override ngOnInit() {
        this.excelButton.visible = false;
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        super.ngOnInit();
        this.infoSrv.load();
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => {
                this.editButton.visible = upd;
            });
    }

    selectInput(ev: MatSelectChange) {
        this.infoSrv.selectedInput = ev.value;
        this.refresh();
    }

    setSelectionMode(mode: number) {
        this.infoSrv.selectionMode = mode === 2? 2 : 1;
        this.refresh();
    }

    override select(id: number) {
        super.select(id);
        this.infoSrv.getSlip(id).subscribe(res => {
            this.paySlip = res || [];
        });
    }

    onTabChange(index: number) {
        this.selectedTabIndex = index;
        if (this.JOURNAL_IDX === index) {
            this.shellSrv.setLoading(true);
            this.infoSrv
                .getJournal()
                .subscribe(res => {
                    this.journalData = res.data;
                    this.headers = res.headers;
                    this.journalColumns = this.FIXED_JOURNAL_HEADERS.concat(res.headers);
                    this.slipTableWidth = 600 + 120 * res.headers.length;
                    this.shellSrv.setLoading(false);
                });
        }
    }

    updateCommon() {
        // this.commonFieldSrv.update({field: })
        const payload = { field: this.form.controls['field'].value,
            value: this.form.controls['value'].value
        };
        if (payload.field?.length == 4) {
            this.confirmationSrv
                .confirm('REMUN_UPDATE_ALL', 'REMUN_UPDATE_ALL')
                .pipe(switchMap(res => res? this.commonFieldSrv.updateAll(payload) : of(false)))
                .subscribe(res => {
                    if (typeof res !== 'boolean') {
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }
}
