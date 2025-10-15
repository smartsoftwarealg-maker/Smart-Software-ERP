import { Component, inject, OnInit, signal } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ELine, MJournal, PaymentElement} from '../elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router} from '@angular/router';
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService} from '@ss/common/ui-default-report-component';
import { HttpService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {ElementsEntryService} from '../services/elements-entry.service';
import {Observable, of, switchMap, tap} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {MatSelectChange} from '@angular/material/select';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import {CommonElementsService} from '../services/common-elements.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CommonModule } from "@angular/common";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { LeavePlanningCalculatorComponent } from '@ss/remuneration/vacation-planning';
import { callback } from 'chart.js/helpers';

@Component({
    selector: 'ss-elements-entry-list',
    templateUrl: './elements-entry-list.component.html',
    styleUrls: ['./elements-entry-list.component.scss', '../common-css.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        ImageInputComponent,
        TranslatePipe,
        PaginationComponent,
        UiAutoCompleteComponent,
        LeavePlanningCalculatorComponent
    ]

})
export class ElementsEntryListComponent extends BaseEntityListComponent<ELine> implements OnInit {
    private employeeSrv  = inject(EmployeeService);
    private httpSrv  = inject(HttpService);
    private monthSelectorSrv  = inject(PayrollMonthService);
    private formBuilder  = inject(UntypedFormBuilder);
    private commonFieldSrv  = inject(CommonElementsService);

    private readonly JOURNAL_IDX = 4;
    private FIXED_COLS = ['photo', 'id', 'firstName', 'lastName', 'post'];
    private FIXED_JOURNAL_HEADERS = ['id', 'firstName', 'lastName'];

    commonElementsLookup = new DefaultAutoCompleteModel(this.commonFieldSrv, 'field');
    form: UntypedFormGroup = null;
    selectedTabIndex = signal(0);
    mainTableWidth = 600;
    slipTableWidth = 600;

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
        public override pagPersistSrv: PaginatorPersistenceService) {
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
        this.mainTableWidth = 600 + 150 * colList.length;
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
        // this.deleteButton.visible = false;
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

    override refresh(callback?: () => void) {
        if (this.infoSrv.selectedInput >= 0) {
            super.refresh(callback);
        }
    }

    override select(id: number) {
        super.select(id);
        this.infoSrv.getSlip(id).subscribe(res => {
            this.paySlip = res || [];
        });
    }

    onTabChange(index: number) {
        this.selectedTabIndex.set(index);
        if (this.JOURNAL_IDX === index) {
            this.shellSrv.setLoading(true);
            this.infoSrv
                .getJournal()
                .subscribe(res => {
                    this.journalData = res.data;
                    this.headers = res.headers;
                    this.journalColumns = this.FIXED_JOURNAL_HEADERS.concat(res.headers);
                    this.slipTableWidth = 570 + 150 * res.headers.length;
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

    override canShowProcessingStatus() {
        return false;
    }
}
