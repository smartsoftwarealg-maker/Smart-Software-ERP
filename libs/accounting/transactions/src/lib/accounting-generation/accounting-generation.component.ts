import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { LoginService, MaterialModule, PaginationModel } from "@ss/common/api-common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {
    AccJournalsService,
    AccountingGenerationService, Check,
    Journal,
    PAYRow,
    TDocument
} from '@ss/accounting/accounting-api';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import { CommonModule } from "@angular/common";


import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';



@Component({
    selector: 'ss-accounting-generation',
    templateUrl: './accounting-generation.component.html',
    styleUrls: ['./accounting-generation.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,


    ],
})
export class AccountingGenerationComponent implements OnInit, OnDestroy {
    private loginSrv = inject(LoginService);
    private generationSrv = inject(AccountingGenerationService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private snackBarSrv = inject(SnackBarService);
    private journalSrv = inject(AccJournalsService);
    private fb = inject(UntypedFormBuilder);

    readonly PURCHASE = 1;
    readonly SALES    = 4;
    readonly PAYROLL  = 5;
    readonly BANK     = 6;
    readonly CASH     = 7;

    private documentMap = new Map(
        [
            [1, {code: 514, description: 'purchase',    stock: false}],
            [2, {code: 514, description: 'inventory',   stock: true}],
            [3, {code: 260, description: 'consumption', stock: true}],
            [4, {code: 258, description: 'sales',       stock: false}],
            [5, {code: 0,   description: 'payroll',     stock: false}],
            [6, {code: 0,   description: 'bank',        stock: false}],
            [7, {code: 0,   description: 'cash',        stock: false}],
        ]);
    private subscriptions: Subscription[] = [];

    showingTransactions = true;
    showingBank         = false;
    showingCash         = false;
    showingPayroll      = false;

    form: UntypedFormGroup | null = null;
    journalLookup = new DefaultAutoCompleteModel<Journal>(this.journalSrv);
    processing = false;
    data: TDocument[] = [];
    payrollData: PAYRow[] = [];
    checkData: Check[] = [];
    cashData: Check[] = [];
    displayedColumns = ['description', 'number', 'date'];
    payrollColumns = ['account', 'description', 'employee', 'cCenter', 'debit', 'credit'];
    bankColumns = ['number', 'date', 'bank'];
    cashColumns = ['number', 'date', 'debit', 'credit'];

    public pagination = PaginationModel.newInstance();

    constructor() {
        this.pagination.onChange = () => this.showDocuments();
        this.pagination.pageSize = 15;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.loginSrv
            .loadContext()
            .subscribe(res => {
                this.form = this.fb.group({
                    year:    [{ value: this.loginSrv.appCtx.accYear, disabled: true }],
                    period:  [{ value: this.loginSrv.appCtx.accPeriod, disabled: true} ],
                    journal: [null, Validators.required],
                    genType: ['purchase', Validators.required],
                });
                this.subscriptions.push(
                    this.form?.controls['genType']
                        .valueChanges
                        .pipe(
                            debounceTime(300),
                            distinctUntilChanged()
                        ).subscribe(v => this.showDocuments()));
            });
    }

    generate() {
        const key = +this.form?.controls['genType'].value;
        const generationPayload = { journal: this.form?.controls['journal'].value,
            genType: this.documentMap.get(key)?.description
        };
        this.generationSrv
            .generate(generationPayload)
            .subscribe(res => {
                this.showDocuments();
                this.snackBarSrv.showSuccessMessage();
            });
    }

    private showTransactions(key: number) {
        const value = this.documentMap.get(key);
        const params = new HttpParams()
            .set('document', value?.code || 0)
            .set('stock', value?.stock);
        this.generationSrv
            .getList(this.pagination.page - 1, this.pagination.pageSize, null, null, params)
            .subscribe({
                next: res => {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.processing = false;
                    this.shellSrv.setLoading(false);
                }, error: err => {
                    this.processing = false;
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }

    private showPayrollLines() {
        this.generationSrv
            .getPayrollLines()
            .subscribe({
                next: res => {
                    this.processing  = false;
                    this.payrollData = res;
                    this.shellSrv.setLoading(false);
                }, error: err => {
                    this.processing = false;
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }

    private showBankPayments() {
        this.generationSrv
            .getChecks()
            .subscribe({
                next: res => {
                    this.processing = false;
                    this.checkData  = res;
                    const bankId = res.length > 0? res[0].journal || null: null;
                    this.form?.controls['journal']?.setValue(bankId);
                    this.shellSrv.setLoading(false);
                }, error: err => {
                    this.processing = false;
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }

    private showCashPayments() {
        this.generationSrv
            .getCash()
            .subscribe({
                next: res => {
                    this.processing = false;
                    this.cashData  = res;
                    this.shellSrv.setLoading(false);
                }, error: err => {
                    this.processing = false;
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }

    showDocuments() {
        this.processing = true;
        this.shellSrv.setLoading(true);
        const key = +this.form?.controls['genType'].value;
        this.showingBank         = key === this.BANK;
        this.showingCash         = key === this.CASH;
        this.showingPayroll      = key === this.PAYROLL;
        this.showingTransactions = key >= this.PURCHASE && key <= this.SALES;

        switch (key) {
        case this.BANK:
            this.showBankPayments();
            break;

        case this.CASH:
            this.showCashPayments();
            break;

        case this.PAYROLL:
            this.showPayrollLines();
            break;

        default:
            this.showTransactions(key);
        }
    }
}
