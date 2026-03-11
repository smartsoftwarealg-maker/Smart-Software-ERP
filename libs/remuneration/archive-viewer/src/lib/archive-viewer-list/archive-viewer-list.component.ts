import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import {PAYArchive} from '../archive-viewer-api';
import {ArchiveViewerService} from '../archive-viewer.service';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {debounceTime, distinctUntilChanged, zip} from 'rxjs';
import {Formula, PayrollFormulasService} from '@ss/remuneration/payroll-formulas';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { NgStyle, DecimalPipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-archive-viewer',
    templateUrl: './archive-viewer-list.component.html',
    styleUrls: ['./archive-viewer-list.component.scss'],
    standalone: true,
    imports: [
        TranslateDirective,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatCheckbox,
        MatButton,
        MatTabGroup,
        MatTab,
        MatTabLabel,
        MatSelectionList,
        MatListOption,
        MatTable,
        NgStyle,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DecimalPipe,
        TranslatePipe,
    ],
})
export class ArchiveViewerListComponent extends BaseEntityListComponent<PAYArchive> implements OnInit {
    private langSrv = inject(LanguageService);
    private INFO_COLUMNS = [
        'id',
        'lastname',
        'firstname',
        'post',
        'birthDate',
        'birthPlace',
        'address1',
        'mobile',
        'ss_number',
        'mutualNo',
        'ms',
        'childCount',
        'sx',
        'hireDate',
        'permDate',
        'suspensionDate',
        'suspensionReason',
        'employmentType',
        'profCategory',
        'salGrid',
        'salRank',
        'qualification',
        // 'center',
        'division',
        'department',
        'service',
        'costCenter',
        'workShop',
        'mxContractDate',
        'diploma',
        'father',
        'mother',
        'lastnameAr',
        'firstnameAr',
        'fatherAr',
        'motherAr',
        'contractType',
        'wife',
        'wifeAr',
        'wifeBirthDate',
        'wifeFather',
        'wifeFatherAr',
        'wifeMother',
        'wifeMotherAr',
        'postAr',
        'paymonth',
    ];

    private FIXED_INFO = [
        'id',
        'lastname',
        'firstname',
        'post',
        'paymonth'];

    private filterSignal = signal<string>('');
    private _formulas = signal<Formula[]>([]);

    minTableWidth = 1000;

    _formulaVariables: string[] = [];
    _formulaHeaders:   string[] = [];
    _info: string[][] = [
        ['post',       this.langSrv.translate('COMMON_POST')],
        ['birthDate',  this.langSrv.translate('PAYROLL_BIRTH_DATE')],
        ['birthPlace', this.langSrv.translate('PAYROLL_BIRTH_PLACE')],
        ['address1',   this.langSrv.translate('COMMON_ADDRESS')],
        ['mobile',     this.langSrv.translate('COMMON_MOBILE')],
        ['ss_number',  this.langSrv.translate('PAYROLL_SS_NUMBER')],
        ['mutualNo',   this.langSrv.translate('PAYROLL_MUTUAL_NUMBER')],
        ['ms',         this.langSrv.translate('COMMON_MARITAL_STATUS')],
        ['childCount', this.langSrv.translate('PAYROLL_CHILD_COUNT')],
        ['sx',         this.langSrv.translate('PAYROLL_SEX')],
        ['hireDate',   this.langSrv.translate('PAYROLL_HIRE_DATE')],
        ['permDate',   this.langSrv.translate('PAYROLL_PERMANENT_DATE')],
        ['suspensionDate',   this.langSrv.translate('PAYROLL_SUSPENSION_DATE')],
        ['suspensionReason', this.langSrv.translate('PAYROLL_SUSPENSION_REASON')],
        ['employmentType',   this.langSrv.translate('PAYROLL_EMPLOYMENT_TYPE')],
        ['profCategory',     this.langSrv.translate('PAYROLL_CATEGORY')],
        ['salGrid',          this.langSrv.translate('PAYROLL_SALARY_GRID')],
        ['salRank',          this.langSrv.translate('PAYROLL_RANK')],
        ['qualification',    this.langSrv.translate('PAYROLL_QUALIFICATION')],
        ['division',         this.langSrv.translate('PAYROLL_DIVISION')],
        ['department',       this.langSrv.translate('PAYROLL_DEPARTMENT')],
        ['service',          this.langSrv.translate('PAYROLL_SERVICE')],
        ['costCenter',       this.langSrv.translate('COMMON_COST_CENTER')],
        ['workShop',         this.langSrv.translate('PAYROLL_WORKSHOP')],
        ['mxContractDate',   this.langSrv.translate('PAYROLL_CONTRACT_DATE')],
        ['diploma',          this.langSrv.translate('PAYROLL_DIPLOMA')],
        ['father',           this.langSrv.translate('PAYROLL_FATHER')],
        ['mother',           this.langSrv.translate('PAYROLL_MOTHER')],
        ['lastnameAr',       this.langSrv.translate('PAYROLL_LAST_NAME_AR')],
        ['firstnameAr',      this.langSrv.translate('PAYROLL_FIRST_NAME_AR')],
        ['fatherAr',         this.langSrv.translate('PAYROLL_FATHER_AR')],
        ['motherAr',         this.langSrv.translate('PAYROLL_MOTHER_AR')],
        ['contractType',     this.langSrv.translate('PAYROLL_CONTRACT_TYPE')],
        ['wife',             this.langSrv.translate('PAYROLL_WIFE')],
        ['wifeAr',           this.langSrv.translate('PAYROLL_WIFE_AR')],
        ['wifeBirthDate',    this.langSrv.translate('PAYROLL_WIFE_BIRTH_DATE')],
        ['wifeFather',       this.langSrv.translate('PAYROLL_WIFE_FATHER')],
        ['wifeMother',       this.langSrv.translate('PAYROLL_WIFE_MOTHER')],
        ['wifeMotherAr',     this.langSrv.translate('PAYROLL_WIFE_MOTHER_AR')],
        ['postAr',           this.langSrv.translate('COMMON_POST_AR')],
        ['paymonth',         this.langSrv.translate('PAYROLL_MONTH')],
    ];
    _minYear = 0;
    _maxYear = 0;
    infoSignal = signal<string[][]>(this._info);
    formulaSelection = signal<string>('');

    fromYear      = new FormControl<number>(0);
    fromMonth     = new FormControl<number>(0);
    toYear        = new FormControl<number>(0);
    toMonth       = new FormControl<number>(0);
    compact       = new FormControl<boolean>(false);
    consolidated  = new FormControl<boolean>(false);
    formulaFilter = new FormControl<string>('');

    filteredFormulas = computed(() => this._formulas()
        .filter(f => {
            const filter = this.filterSignal().toLowerCase();
            return filter.length == 0 ||
                f.variable.toLowerCase()?.includes(filter) ||
                f.description?.toLowerCase().includes(filter);
        }).sort((a, b) => a.variable.localeCompare(b.variable)));

    displayedColumns = this.FIXED_INFO;

    constructor(
        public override entitySrv: ArchiveViewerService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private selectorSrv: PayrollMonthService,
        private formulas: PayrollFormulasService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PAYROLL_ARCHIVE_VIEWER');
    }

    override ngOnInit() {
        this.editButton.visible = false;
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        super.ngOnInit();
        this.shellSrv.disableSearch();
        zip(this.selectorSrv.minMonth(),
            this.selectorSrv.maxMonth(),
            this.formulas.getList(0, 500, null, 'variable'))
            .subscribe(res => {
                this._minYear = +(res[0].month / 100).toFixed(0);
                this._maxYear = +(res[1].month / 100).toFixed(0);

                this._formulas.set(res[2].body
                    .filter(f => f.description !== null && f.description != undefined)
                    .sort((a, b) => a.description.localeCompare(b.description)));

                this.fromYear.setValue(this._maxYear);
                this.fromMonth.setValue(res[1].month % 100);

                this.toYear.setValue(this._maxYear);
                this.toMonth.setValue(res[1].month % 100);
            });

        this.subscriptions.push(
            this.formulaFilter
                .valueChanges
                .pipe(debounceTime(300), distinctUntilChanged())
                .subscribe(str => this.filterSignal.set(str)));
    }

    clearSelection(list: MatSelectionList) {
        list.deselectAll();
        this.formulaSelection.set('');
    }

    refreshList(personalSel: SelectionModel<MatListOption>) {
        const from = this.fromYear.value * 100 + this.fromMonth.value;
        const to = this.toYear.value * 100 + this.toMonth.value;
        this._formulaHeaders = [];
        this._formulaVariables = [];

        const selectedFormulas = this._formulas().filter(e => this.formulaSelection().indexOf(e.variable) >= 0);

        if (this.compact.value) {
            const periods = this.periodInterval();
            periods.forEach(((p, ip) => {
                selectedFormulas.forEach((f, fi) => {
                    this._formulaVariables.push('v' + (1 + this._formulaVariables.length));
                    this._formulaHeaders.push(p + '-' + f.description);
                });
            }));
        } else {
            this._formulaHeaders = selectedFormulas.map(e => e.description);
            this._formulaVariables = selectedFormulas.map(e => e.variable);
        }

        const personalInfo = this.FIXED_INFO.concat(personalSel.selected.map((e: any) => e.value)).join(',');
        this.entitySrv
            .refreshList(from,
                to,
                this.formulaSelection(),
                personalInfo,
                this.compact.value,
                this.consolidated.value,
                this.pagination.page - 1,
                this.pagination.pageSize)
            .subscribe(res => {
                this.pagination.elementCount = res.itemCount;
                this.displayedColumns = this.INFO_COLUMNS.filter(e => personalInfo.indexOf(e) >= 0);
                this.displayedColumns = this.displayedColumns.concat(this._formulaVariables);
                this.data = res.body;
            });
        this.minTableWidth = 900 + 100 * (2 * this._formulaVariables.length + personalSel.selected.length);
        // console.log(this.minTableWidth);
    }

    private periodInterval(): number[] {
        const periods: number[] = [];

        let from = this.fromYear.value * 100 + this.fromMonth.value;
        while (from <= this.toYear.value * 100 + this.toMonth.value) {
            periods.push(from);
            from++;
            if (from % 100 > 12) {
                from = +(from / 100).toFixed(0) * 100 + 101;
            }
        }

        return periods;
    }

    formulaSelected(event: MatSelectionListChange) {
        this.formulaSelection.update(old => (old? `${old},`: '') + event.options.map(e => e.value.variable).join(','));
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }
}
