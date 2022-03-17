import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import {ElementsEntryService, ELine} from '@ss/remuneration/elements-entry';
import {map, of, switchMap, tap} from 'rxjs';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {EmployeeLookupService} from '../employee-lookup.service';
import {Lookup, Special, SpecialPayrollService} from '@ss/remuneration/special-payroll-common';

@Component({
  selector: 'ss-special-payroll-detail',
  templateUrl: './special-payroll-detail.component.html',
  styleUrls: ['./special-payroll-detail.component.scss']
})
export class SpecialPayrollDetailComponent extends BaseEntityDetailComponent<Special> implements OnInit, OnDestroy {
    employeeLookup = new FormControl();

    processing = false;
    displayedColumns = ['id', 'lastName', 'firstName', 'post']
    data: ELine[] = [];
    selected = 0;
    payrollId = 0;
    pagingModel = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0});
    public employeeAutoCompleteModel = new DefaultAutoCompleteModel<Lookup>(this.employeeSrv);
    constructor(
        private detailSrv: SpecialPayrollService,
        override shellSrv: ShellService,
        override snackBarSrv: SnackBarService,
        override route: ActivatedRoute,
        override formBuilder: FormBuilder,
        override confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService,
        private entrySrv: ElementsEntryService,
        private selectorSrv: PayrollMonthService,
        private employeeSrv: EmployeeLookupService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_SPECIAL_PAYROLLS');
        this.pagingModel.onChange = () => this.refresh();
    }

    private refresh() {
        this.entrySrv
            .getList(this.pagingModel.page - 1, this.pagingModel.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.pagingModel.elementCount = res.itemCount;
            });
    }

    setupForm(e: Special): FormGroup {
        this.payrollId = e?.id;
        this.selectorSrv
            .selectMonth(e.paymonth || this.loginSrv.appCtx.payMonth)
            .subscribe();
        this.refresh();
        return this.formBuilder.group({
            id: [e.id || 0],
            center: [this.loginSrv.appCtx.center],
            paymonth: [e.paymonth || this.loginSrv.appCtx.payMonth % 1_000_000],
            description: [e.description, Validators.required],
        });
    }

    selectRow(row: ELine) {
        this.selected = row.id;
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.selectorSrv
            .selectMonth(this.loginSrv.appCtx.payMonth % 1_000_000)
            .subscribe(res => {})
            .unsubscribe();
    }

    generateAll() {
        type Response = {itemCount: number, body: ELine[]};
        this.detailSrv
            .generateAll()
            .pipe(tap(_ => this.snackBarSrv.showSuccessMessage()),
                switchMap(_ => this.entrySrv.getList(this.pagingModel.page - 1, this.pagingModel.pageSize)))
            .subscribe({
                next:
                    (res: Response) => {
                        this.data = res.body;
                        this.pagingModel.elementCount = res.itemCount;
                        this.processing = false;
                    },
                error: (err: Error) => {
                    this.processing = false;
                    throw err
                }
            });
    }

    deleteAll() {
        type Response = {itemCount: number, body: ELine[]};
        type Result =  Response | boolean;
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.detailSrv.deleteAll() : of(res)),
                  tap(res => this.processing = res !== false),
                  switchMap(_ => this.processing? this.entrySrv.getList(this.pagingModel.page - 1, this.pagingModel.pageSize) : of(false))
            ).subscribe({
                next:
                    (res: Result) => {
                        if (typeof res !== 'boolean') {
                            this.data = res.body;
                            this.pagingModel.elementCount = res.itemCount;
                        }
                        this.processing = false;
                    },
                error: err => {
                    this.processing = false;
                    throw err
                }
            });
    }

    generateOne() {
        type Response = {itemCount: number, body: ELine[]};
        this.processing = true;
        this.detailSrv
            .generateOne(this.employeeLookup.value)
            .pipe(tap(_ => this.snackBarSrv.showSuccessMessage()),
                switchMap(_ => this.entrySrv.getList(this.pagingModel.page - 1, this.pagingModel.pageSize)))
            .subscribe({
                next:
                    (res: Response) => {
                        this.data = res.body;
                        this.pagingModel.elementCount = res.itemCount;
                        this.processing = false;
                    },
                error: (err: any) => {
                    this.processing = false;
                    throw err
                }
            });
    }

    deleteSelected() {
        type Response = {itemCount: number, body: ELine[]};
        type Result =  Response | boolean;
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.detailSrv.deleteOne(this.selected) : of(res)),
                tap(res => this.processing = res !== false),
                switchMap(_ => this.processing? this.entrySrv.getList(this.pagingModel.page - 1, this.pagingModel.pageSize) : of(false))
            ).subscribe({
            next:
                (res: Result) => {
                    if (typeof res !== 'boolean') {
                        this.data = res.body;
                        this.pagingModel.elementCount = res.itemCount;
                    }
                    this.processing = false;
                },
            error: err => {
                this.processing = false;
                throw err
            }
        });
    }
}
