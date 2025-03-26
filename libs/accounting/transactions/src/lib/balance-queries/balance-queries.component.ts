import { Component, inject, OnInit, signal } from '@angular/core';
import {
    ACCTransactionLine,
    AccTransactionLineService,
    Balance,
    BalanceQueryService,
    GL
} from '@ss/accounting/accounting-api';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Sort } from '@angular/material/sort';



@Component({
    selector: 'ss-balance-queries',
    templateUrl: './balance-queries.component.html',
    styleUrls: ['./balance-queries.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        PaginationComponent
    ]
})
export class BalanceQueriesComponent implements OnInit {
    private detailSrv = inject(AccTransactionLineService);
    private fb = inject(FormBuilder);
    public balancePaginator = PaginationModel.newInstance();
    public glPaginator      = PaginationModel.newInstance();
    public detailPaginator  = PaginationModel.newInstance();

    selectedAccount: string | null = null;
    selectedGL = signal<GL|null>(null);
    selectedDetail = signal<ACCTransactionLine|null>(null);

    form: UntypedFormGroup = null;
    balanceCols = [
        'accountNo',
        'description',
        'customer',
        'denomination',
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
        'customer',
        'denomination',
        'debit',
        'credit'
    ];

    detailCols = [
        'pieceNo',
        'lineNumber',
        'accountNo',
        'description',
        'customer',
        'reference',
        'debit',
        'credit'
    ]

    balanceData: Balance[] = [];
    glData: GL[] = [];
    detailData: ACCTransactionLine[] = [];

    constructor(private querySrv: BalanceQueryService,
                private shellSrv: ShellService,
                private route: ActivatedRoute) {
        this.balancePaginator.onChange = () => this.refreshBalance();
        this.glPaginator.onChange = () => this.refreshGL();
        this.detailPaginator.onChange = () => this.refreshDetail();
        this.detailPaginator.pageSize = this.glPaginator.pageSize = this.balancePaginator.pageSize = 10;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            accountNo: [''],
            filter:    [''],
            from:      [1, [Validators.required, Validators.min(1), Validators.max(12)]],
            to:        [12, [Validators.required, Validators.min(1), Validators.max(12)]],
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
            .set('account', formValue.accountNo.trim())
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
        this.detailData = [];
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
        this.detailPaginator.page = 1
        this.selectedGL.set(row);
        this.detailSrv.setParentId(row?.id||0);
        this.refreshDetail();
    }

    selectDetail(row: ACCTransactionLine) {
        this.detailPaginator.page = 1
        this.selectedDetail.set(row);
    }

    private refreshDetail() {
        this.detailSrv
            .getPage(this.detailPaginator, null, null)
            .subscribe(res => this.detailData = res);
    }

    sortBalance(event: Sort) {
        this.querySrv.sortColumn = event;
        this.refreshBalance();
    }
    sortGL(event: Sort) {
        // console.log(event);
        this.querySrv.sortColumn = event;
        this.refresh();
    }
    sortDetail(event: Sort) {
        // console.log(event);
        this.detailSrv.sortColumn = event;
        this.refreshDetail();
    }

    protected readonly math = Math;
}
