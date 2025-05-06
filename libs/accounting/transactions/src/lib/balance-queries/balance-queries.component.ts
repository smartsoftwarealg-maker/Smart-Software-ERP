import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
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
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Sort } from '@angular/material/sort';
import { generate } from 'rxjs';



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
        PaginationComponent,
        TranslatePipe
    ]
})
export class BalanceQueriesComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    private detailSrv = inject(AccTransactionLineService);
    private fb = inject(FormBuilder);
    private querySrv  = inject(BalanceQueryService,);
    private shellSrv  = inject(ShellService,);
    private route  = inject(ActivatedRoute);

    public balancePaginator = PaginationModel.newInstance();
    public glPaginator      = PaginationModel.newInstance();
    public detailPaginator  = PaginationModel.newInstance();

    selectedAccount: string | null = null;
    selectedGL = signal<GL|null>(null);
    selectedDetail = signal<ACCTransactionLine|null>(null);
    selectedGLIDs = signal<number[]>([]);
    selectionTotal = computed(() => {
        const selection = this.selectedGLIDs();
        return this.glData
            .filter(d => selection.indexOf(d.oId) >= 0)
            .reduce((a, d) => ({debit: a.debit + d.debit, credit: a.credit + d.credit}), {debit: 0.0, credit: 0});
    });

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
        'credit',
        'selection'
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

    constructor() {
        this.balancePaginator.onChange = () => this.refreshBalance();
        this.glPaginator.onChange = () => this.refreshGL();
        this.detailPaginator.onChange = () => this.refreshDetail();
        this.detailPaginator.pageSize = this.glPaginator.pageSize = this.balancePaginator.pageSize = 5;
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
        this.querySrv.sortColumn = event;
        this.refresh();
    }
    sortDetail(event: Sort) {
        this.detailSrv.sortColumn = event;
        this.refreshDetail();
    }

    selectGLLine(id?: number) {
        this.selectedGLIDs.update(list => {
            if (list.indexOf(id) >= 0) {
                list = list.filter(i => i !== id);
            } else {
                list.push(id);
            }
            return [...list];
        })

    }

    protected readonly math = Math;
    protected readonly generate = generate;

    protected generateExcel() {
        this.querySrv
            .exportToExcel(this.getParams())
            .subscribe(blob => {
                if (blob && blob.size > 100) {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = this.querySrv.constructor.name + '.xlsx';
                    link.click();
                    setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                }
        });
   }
}
