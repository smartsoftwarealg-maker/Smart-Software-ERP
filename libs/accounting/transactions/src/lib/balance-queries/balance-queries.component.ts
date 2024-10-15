import { Component, inject, OnInit } from '@angular/core';
import { Balance, BalanceQueryService, GL } from '@ss/accounting/accounting-api';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';


@Component({
    selector: 'ss-balance-queries',
    templateUrl: './balance-queries.component.html',
    styleUrls: ['./balance-queries.component.scss'],
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
export class BalanceQueriesComponent implements OnInit {
    private fb = inject(FormBuilder);
    public balancePaginator = PaginationModel.newInstance();
    public glPaginator      = PaginationModel.newInstance();

    selectedAccount: string | null = null;
    glAccount: string | null = null;
    form: UntypedFormGroup = null;
    balanceCols = [
        'accountNo',
        'description',
        'customer',
        'oldDebit',
        'oldCredit',
        'curDebit',
        'curCredit',
        'totDebit',
        'totCredit',
        'debit',
        'credit'
    ];
    glCols = [
        'accountNo',
        'description',
        'pieceNo',
        'journal',
        'reference',
        'checkNo',
        'debit',
        'credit'
    ];

    balanceData: Balance[] = [];
    glData: GL[] = [];

    constructor(private querySrv: BalanceQueryService,
                private shellSrv: ShellService,
                private route: ActivatedRoute) {
        this.balancePaginator.onChange = () => this.refreshBalance();
        this.glPaginator.onChange = () => this.refreshGL();
        this.glPaginator.pageSize = this.balancePaginator.pageSize = 15;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            filter: [''],
            from:   [1, [Validators.required, Validators.min(1), Validators.max(12)]],
            to:     [12, [Validators.required, Validators.min(1), Validators.max(12)]],
            consolidated: [false, Validators.required]
        });
        this.shellSrv.setGoBackPath('..', this.route);
    }

    refresh() {
        this.refreshBalance();
        this.refreshGL();
    }

    private getParams(): HttpParams {
        const formValue = this.form.value;
        return new HttpParams()
            .set('filter', formValue.filter.trim())
            .set('from', formValue.from)
            .set('to', formValue.to)
            .set('consolidated', formValue.consolidated);
    }
    private refreshBalance() {
        this.querySrv
            .getList(this.balancePaginator.page - 1, this.balancePaginator.pageSize, null, null, this.getParams())
            .subscribe(res => {
                this.balanceData = res.body;
                this.balancePaginator.elementCount = res.itemCount;
            })
    }

    private refreshGL() {
        this.querySrv
            .getGL(this.glPaginator, this.getParams())
            .subscribe(res => {
                this.glData = res.body;
                this.glPaginator.elementCount = res.itemCount;

            })
    }

    selectBalance(row: Balance) {
        this.selectedAccount = row?.accountNo;
    }
    selectGL(row: GL) {
        this.glAccount = row?.accountNo;
    }
}
