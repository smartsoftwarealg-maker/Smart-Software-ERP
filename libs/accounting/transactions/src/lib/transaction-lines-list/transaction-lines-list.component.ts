import { Component, OnInit } from '@angular/core';
import {
    AccPoliciesService, ACCPolicy,
    ACCTransactionLine, AccTransactionLineService, SCALE
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {of, switchMap, tap} from 'rxjs';

@Component({
    selector: 'ss-transaction-lines-list',
    templateUrl: './transaction-lines-list.component.html',
    styleUrls: ['./transaction-lines-list.component.scss']
})
export class TransactionLinesListComponent implements OnInit {
    data: ACCTransactionLine[] = [];
    private accPolicy: ACCPolicy = null;
    pagination = PaginationModel.newInstance({page: 0, pageSize: 5, elementCount: 0});
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
        private policySrv: AccPoliciesService) {
        this.pagination.onChange = () => this.refresh();
    }

    ngOnInit() {
        this.parentId = this.entitySrv.getParentId();
        this.loginSrv
            .loadContext()
            .pipe(switchMap(_ => this.policySrv.get(this.loginSrv.appCtx.center)),
                tap(res => {
                    this.accPolicy = res;
                    this.displayedColumns = this.COLUMNS.filter(e => this.accPolicy?.manualCashFlow || e !== 'c_o_d');
                }),
                switchMap(_ => this.entitySrv.getList(0, 5))
            )
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    selectRow(row: ACCTransactionLine) {
        row.id = (row.fileId * SCALE + row.oid) * SCALE + row.lineNumber;
        this.selected = row?.id || 0;
    }

    save() {

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
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }


}
