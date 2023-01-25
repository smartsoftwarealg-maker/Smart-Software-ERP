import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {PAYArchive} from '../archive-viewer-api';
import {ArchiveViewerService} from '../archive-viewer.service';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {debounceTime, distinctUntilChanged, zip} from 'rxjs';
import {Formula, PayrollFormulasService} from '@ss/remuneration/payroll-formulas';
import {FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatListOption} from '@angular/material/list';

@Component({
    selector: 'ss-archive-list',
    templateUrl: './archive-viewer-list.component.html',
    styleUrls: ['./archive-viewer-list.component.scss'],
})
export class ArchiveViewerListComponent extends BaseEntityListComponent<PAYArchive> implements OnInit {
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
        'firstname'];

    minTableWidth = 1000;

    _formulaVariables: string[] = [];
    _formulaHeaders:   string[] = [];
    _formulas: Formula[] = [];
    _info: string[][] = [
        ['post', 'PAYROLL_POST'],
        ['birthDate', 'PAYROLL_BIRTH_DATE'],
        ['birthPlace', 'PAYROLL_BIRTH_PLACE'],
        ['address1', 'COMMON_ADDRESS'],
        ['mobile', 'COMMON_MOBILE'],
        ['ss_number', 'PAYROLL_SS_NUMBER'],
        ['mutualNo', 'PAYROLL_MUTUAL_NUMBER'],
        ['ms', 'COMMON_MARITAL_STATUS'],
        ['childCount', 'PAYROLL_CHILD_COUNT'],
        ['sx', 'PAYROLL_SEX'],
        ['hireDate', 'PAYROLL_HIRE_DATE'],
        ['permDate', 'PAYROLL_PERMANENT_DATE'],
        ['suspensionDate', 'PAYROLL_SUSPENSION_DATE'],
        ['suspensionReason', 'PAYROLL_SUSPENSION_REASON'],
        ['employmentType', 'PAYROLL_EMPLOYMENT_TYPE'],
        ['profCategory', 'PAYROLL_CATEGORY'],
        ['salGrid', 'PAYROLL_SALARY_GRID'],
        ['salRank', 'PAYROLL_RANK'],
        ['qualification', 'PAYROLL_QUALIFICATION'],
        ['division', 'PAYROLL_DIVISION'],
        ['department', 'PAYROLL_DEPARTMENT'],
        ['service', 'PAYROLL_SERVICE'],
        ['costCenter', 'COMMON_COST_CENTER'],
        ['workShop', 'PAYROLL_WORKSHOP'],
        ['mxContractDate', 'PAYROLL_CONTRACT_DATE'],
        ['diploma', 'PAYROLL_DIPLOMA'],
        ['father', 'PAYROLL_FATHER'],
        ['mother', 'PAYROLL_MOTHER'],
        ['lastnameAr', 'PAYROLL_LAST_NAME_AR'],
        ['firstnameAr', 'PAYROLL_FIRST_NAME_AR'],
        ['fatherAr', 'PAYROLL_FATHER_AR'],
        ['motherAr', 'PAYROLL_MOTHER_AR'],
        ['contractType', 'PAYROLL_CONTRACT_TYPE'],
        ['wife', 'PAYROLL_WIFE'],
        ['wifeAr', 'PAYROLL_WIFE_AR'],
        ['wifeBirthDate', 'PAYROLL_WIFE_BIRTH_DATE'],
        ['wifeFather', 'PAYROLL_WIFE_FATHER'],
        ['wifeMother', 'PAYROLL_WIFE_MOTHER'],
        ['wifeMotherAr', 'PAYROLL_WIFE_MOTHER_AR'],
        ['postAr', 'PAYROLL_POST_AR'],
        ['paymonth', 'PAYROLL_MONTH'],
    ];
    _minYear = 0;
    _maxYear = 0;

    fromYear      = new FormControl<number>(0);
    fromMonth     = new FormControl<number>(0);
    toYear        = new FormControl<number>(0);
    toMonth       = new FormControl<number>(0);
    compact       = new FormControl<boolean>(false);
    formulaFilter = new FormControl<string>('');

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
        super.ngOnInit();
        this.editButton.visible = false;
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        zip(this.selectorSrv.minMonth(),
            this.selectorSrv.maxMonth(),
            this.formulas.getList(0, 500))
            .subscribe(res => {
                this._minYear = +(res[0].month / 100).toFixed(0);
                this._maxYear = +(res[1].month / 100).toFixed(0);

                this._formulas = res[2].body
                    .filter(f => f.description !== null && f.description != undefined)
                    .sort((a, b) => a.description.localeCompare(b.description));

                this.fromYear.setValue(this._maxYear);
                this.fromMonth.setValue(res[1].month % 100);

                this.toYear.setValue(this._maxYear);
                this.toMonth.setValue(res[1].month % 100);
            });

        this.subscriptions.push(
            this.formulaFilter
                .valueChanges
                .pipe(debounceTime(300), distinctUntilChanged())
                .subscribe(str => this.refreshFormulas()));
    }

    private refreshFormulas() {
        this.formulas
            .getList(0, 500, this.formulaFilter.value)
            .subscribe(res => this._formulas = res.body);
    }

    refreshList(personalSel: SelectionModel<MatListOption>, formulaSel: SelectionModel<MatListOption>) {
        const from = this.fromYear.value * 100 + this.fromMonth.value;
        const to = this.toYear.value * 100 + this.toMonth.value;
        if (this.compact.value) {
            const periods = this.periodInterval();
            const formulas = formulaSel.selected.map((e: any, i) => e.value?.description);
            this._formulaHeaders = [];
            this._formulaVariables = [];
            periods.forEach(((p, ip) => {
                formulas.forEach((f, fi) => {
                    this._formulaVariables.push('v' + (1 + this._formulaVariables.length));
                    this._formulaHeaders.push(p + '-' + f)
                })
            }));
        } else {
            this._formulaHeaders = formulaSel.selected.map((e: any, i) => e.value?.description);
            this._formulaVariables = formulaSel.selected.map((e: any, i) => 'v' + (i + 1)).slice(0, 9);
        }
        const formulas = formulaSel.selected.map((e: any) => e.value.variable).join(',');
        const personalInfo = this.FIXED_INFO.concat(personalSel.selected.map((e: any) => e.value)).join(',');
        this.entitySrv
            .refreshList(from,
                to,
                formulas,
                personalInfo,
                this.compact.value,
                this.pagination.page - 1,
                this.pagination.pageSize)
            .subscribe(res => {
                this.pagination.elementCount = res.itemCount;
                this.displayedColumns = this.INFO_COLUMNS.filter(e => personalInfo.indexOf(e) >= 0);
                this.displayedColumns = this.displayedColumns.concat(this._formulaVariables);
                this.data = res.body;
            });
         this.minTableWidth = 400 + 100 * (formulaSel.selected.length + this._formulaVariables.length + personalSel.selected.length);
        // console.log(this.minTableWidth);
    }

    private periodInterval(): number[] {
        const periods: number[] = [];

        let from = this.fromYear.value * 100 + this.fromMonth.value;
        while (from <= this.toYear.value * 100 + this.toMonth.value) {
            periods.push(from);
            from++;
            if (from % 100 > 12) {
                from = +(from / 100).toFixed(0) + 101;
            }
        }

        return periods;
    }
}
