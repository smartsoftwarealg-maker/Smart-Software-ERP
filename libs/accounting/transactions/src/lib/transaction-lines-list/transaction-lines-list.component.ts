import { Component, DestroyRef, OnInit } from "@angular/core";
import {
    AccPoliciesService, ACCPolicy,
    ACCTransactionLine, AccTransactionLineService, SCALE
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LoginService, MaterialModule, PaginationModel, PaginatorPersistenceService } from "@ss/common/api-common";
import { of, Subscription, switchMap, tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";

import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Sort } from "@angular/material/sort";

@Component({
    selector: 'ss-transaction-lines-list',
    templateUrl: './transaction-lines-list.component.html',
    styleUrls: ['./transaction-lines-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiConfirmationDialogModule,

    ],
})
export class TransactionLinesListComponent implements OnInit {
    private susbscription: Subscription = null;
    data: ACCTransactionLine[] = [];
    private accPolicy: ACCPolicy = null;
    pagination = PaginationModel.newInstance({page: 0, pageSize: 5, elementCount: 0});
    searchText = new FormControl<string>('');
    private COLUMNS = [
        'lineNumber',
        'accountNo',
        'description',
        'customer',
        'reference',
        'c_o_d',
        'debit',
        'credit'];
    displayedColumns = this.COLUMNS;

    selected= 0;
    parentId: number = null;

    constructor(
        public entitySrv: AccTransactionLineService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService,
        private loginSrv: LoginService,
        private policySrv: AccPoliciesService,
        private destroyRef: DestroyRef) {
        this.pagination.onChange = () => this.refresh();
        this.destroyRef.onDestroy(() => this.susbscription?.unsubscribe());
    }

    ngOnInit() {
        this.parentId = this.entitySrv.getParentId();
        this.route
            .parent
            .parent
            .params
            .pipe(tap(params => {
                this.parentId = +params['id'];
                this.entitySrv.setParentId(this.parentId);
            }),
            switchMap(() => this.entitySrv.getList(0, 5)))
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });

        this.policySrv
            .get(this.loginSrv.appCtx.center)
            .subscribe(res => {
                this.accPolicy = res;
                this.displayedColumns = this.COLUMNS.filter(e => this.accPolicy?.manualCashFlow || e !== 'c_o_d');
            });
        this.susbscription = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(res => this.refresh());
    }

    selectRow(row: ACCTransactionLine) {
        row.id = (row.fileId * SCALE + row.oid) * SCALE + row.lineNumber;
        this.selected = row?.id || 0;
    }


    delete() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.entitySrv.remove(this.selected) : of({count: -1})),
                switchMap(res => res.count > 0 ? this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize) : of(null)))
            .subscribe(res => {
                if (res && res.itemCount != null) {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.snackBarSrv.showSuccessMessage();
                    this.selected = null;
                }
            });

    }
    showDetail(id: number) {
        this.router.navigate([id], {relativeTo: this.route}).then();
    }

    refresh() {
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize, this.searchText.value)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    sort(event: Sort) {
        this.entitySrv.sortColumn = event;
        this.refresh();
    }
}
