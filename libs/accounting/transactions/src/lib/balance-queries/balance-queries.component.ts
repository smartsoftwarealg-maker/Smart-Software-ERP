import { Component, inject, OnInit } from "@angular/core";
import {Balance, BalanceQueryService, GL} from '@ss/accounting/accounting-api';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import {PaginationModel} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'ss-balance-queries',
    templateUrl: './balance-queries.component.html',
    styleUrls: ['./balance-queries.component.scss']
})
export class BalanceQueriesComponent implements OnInit {
    private fb = inject(FormBuilder);
    public balancePaginator = PaginationModel.newInstance();
    public glPaginator      = PaginationModel.newInstance();

    selectedAccount: string | null = null;
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
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            filter: ['', Validators.required],
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
        const params = new HttpParams()
            .set('filter', formValue.filter.trim())
            .set('from', formValue.from)
            .set('to', formValue.to)
            .set('consolidated', formValue.consolidated);
        return params;
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
        this.selectedAccount = row?.accountNo;
    }
}
