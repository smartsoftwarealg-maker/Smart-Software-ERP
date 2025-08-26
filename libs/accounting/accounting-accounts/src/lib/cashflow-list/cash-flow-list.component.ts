import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {
    AnnexCode,
    AnnexCodeService,
    CashFlowAccountService,
    PendingTreasury,
    TreasuryInfo
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { debounceTime, switchMap, tap } from 'rxjs';
import { UntypedFormControl, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {CashFlowAccountListComponent} from '../cash-flow-account-list/cash-flow-account-list.component';
import { MatList, MatListItem } from '@angular/material/list';
import { DecimalPipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs/operators';
import { callback } from 'chart.js/helpers';

@Component({
    selector: 'ss-cashflow-accounts-list',
    templateUrl: './cash-flow-list.component.html',
    styleUrls: ['./cash-flow-list.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        CashFlowAccountListComponent,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatCheckbox,
        MatButton,
        TranslateDirective,
        DecimalPipe
    ]
})
export class CashFlowListComponent extends BaseEntityListComponent<AnnexCode> {
    #destroyRef = inject(DestroyRef);
    @ViewChild(CashFlowAccountListComponent) accountList: CashFlowAccountListComponent;

    selectedId = 0;
    selectedCode = '';
    pendingData: PendingTreasury[] = [];
    infoData: TreasuryInfo = { total: 0, located: 0, nonLocated: 0 };
    pendingColumns = ['add', 'accountNo', 'description', 'debit', 'credit'];

    itemSearch = new FormControl<string>('');
    totalDB = new FormControl();
    locatedDB = new UntypedFormControl();
    nonLocatedDB = new UntypedFormControl();

    totalCR = new UntypedFormControl();
    locatedCR = new UntypedFormControl();
    nonLocatedCR = new UntypedFormControl();

    consolidated = new UntypedFormControl();
    filteredData: AnnexCode[] = [];

    constructor(
        public override entitySrv: AnnexCodeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private cashFlowSrv: CashFlowAccountService,
        private loginSrv: LoginService) {
        super(entitySrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
            'ACC_CASH_FLOW');
        this.pagination.pageSize = 20;
    }

    override ngOnInit() {
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        this.editButton.visible = false;
        this.itemSearch
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.#destroyRef)
            )
            .subscribe(res => this.filteredData = this.data.filter(e => res === '' || e.code.toLowerCase().indexOf(res) >= 0 || e.description?.toLowerCase().indexOf(res) >= 0));
        super.ngOnInit();
    }

    selectItem(annex: AnnexCode) {
        this.selectedId = annex?.id;
        this.selectedCode = annex?.code;
    }

    refreshPending() {
        this.shellSrv.setLoading(true)
        this.cashFlowSrv
            .info(!!this.consolidated.value)
            .pipe(tap(res => {
                    this.infoData = res;
                    this.totalDB.setValue(res.total > 0 ? res.total.toLocaleString() : 0.0);
                    this.totalCR.setValue(res.total > 0 ? 0.0 : (-res.total).toLocaleString());
                    this.locatedDB.setValue(res.located > 0? res.located.toLocaleString() : 0.0);
                    this.locatedCR.setValue(res.located > 0? 0.0 : (-res.located).toLocaleString());
                    this.nonLocatedDB.setValue(res.nonLocated > 0 ? res.nonLocated.toLocaleString() : 0);
                    this.nonLocatedCR.setValue(res.nonLocated > 0 ? 0 : (-res.nonLocated).toLocaleString());
                }),
                switchMap(_ => this.cashFlowSrv.pending('', false, null)))
            .subscribe({
                next: res => {
                    this.pendingData = res;
                    this.shellSrv.setLoading(false);
                },
                error: err => this.shellSrv.setLoading(false)
            });
    }

    refreshPendingAccounts(event: Sort) {
        this.shellSrv.setLoading(true)
        const order = event.active? (event.direction === 'desc' ? '-' : '') + event.active : null;
        this.cashFlowSrv
            .pending('', this.consolidated.value === true, order)
            .subscribe(res => {
                this.pendingData = res;
                this.shellSrv.setLoading(false);
            });
    }

    add(e: PendingTreasury) {
        if (this.selectedCode != null && this.loginSrv.appCtx.accYear > 1000) {
            const data = {
                id: 0,
                code: this.selectedCode,
                accountno: e.accountNo,
                balanceSign: 3,
                fileYear: this.loginSrv.appCtx.accYear,
            };
            this.cashFlowSrv
                .add(data)
                .subscribe(res => {
                    if (res > 0) {
                        this.pendingData = this.pendingData.filter(x => x.accountNo != e.accountNo);
                        this.accountList?.refresh();
                        this.snackBarSrv.showSuccessMessage();
                    }
                })
        }
    }

    override refresh(callback?: () => void) {
        super.refresh(() => this.filteredData = this.data);
    }
}
