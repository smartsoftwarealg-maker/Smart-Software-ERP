import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import {
    LanguageService,
    LoginService,
    MaterialModule,
    PaginationModel,
} from '@ss/common/api-common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import {
    AccJournalsService,
    AccountingGenerationService,
    Check,
    GenerationInfo,
    Journal,
    PAYRow,
    TDocument,
} from '@ss/accounting/accounting-api';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { concatMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { from, tap } from 'rxjs';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        ReactiveFormsModule,
        PaginationComponent,
        UiAutoCompleteComponent,
    ],
})
export class AccountingGenerationComponent implements OnInit {
    #destroyRef = inject(DestroyRef);
    private confirmationSrv = inject(ConfirmationDialogService);
    private loginSrv = inject(LoginService);
    private generationSrv = inject(AccountingGenerationService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private snackBarSrv = inject(SnackBarService);
    private journalSrv = inject(AccJournalsService);
    private fb = inject(UntypedFormBuilder);
    private langSrv = inject(LanguageService);

    readonly PURCHASE = 1;
    readonly INVENTORY = 2;
    readonly CONSUMPTION = 3;
    readonly SALES = 4;
    readonly PAYROLL = 5;
    readonly BANK = 6;
    readonly CASH = 7;
    readonly TRANSFER_OUT = 8;
    readonly TRANSFER_IN = 9;

    readonly INITIAL_STATE = 0;
    readonly PROCESSING = 1;
    readonly DONE = 2;
    journalMap = new Map<string, number>([
        ['purchaseJr', 1],
        ['inventoryJr', 2],
        ['consumptionJr', 3],
        ['salesJr', 4],
        ['payrollJr', 5],
        ['transferInJr', 8],
        ['transferOutJr', 9],
    ]);

    private documentMap = new Map([
        [1, { code: 514, description: 'purchase', stock: false }],
        [2, { code: 514, description: 'inventory', stock: true }],
        [3, { code: 260, description: 'consumption', stock: true }],
        [4, { code: 258, description: 'sales', stock: false }],
        [5, { code: 0, description: 'payroll', stock: false }],
        [6, { code: 0, description: 'bank', stock: false }],
        [7, { code: 0, description: 'cash', stock: false }],
        [8, { code: 259, description: 'transfer_out', stock: false }],
        [9, { code: 516, description: 'transfer_in', stock: false }],
    ]);
    private totalsMap = new Map([
        [1, 'purchaseCount'],
        [2, 'inventoryCount'],
        [3, 'consumptionCount'],
        [4, 'salesCount'],
        [5, 'payrollCount'],
        [8, 'transferInCount'],
        [9, 'transferOutCount'],
    ]);

    showingTransactions = signal(true);
    showingBank = signal(false);
    showingCash = signal(false);
    showingPayroll = signal(false);

    processedDocuments = signal<number[]>([]);
    processingDocument = signal(0);

    form: UntypedFormGroup | null = null;
    journalLookup = new ActiveJournalLookup(this.journalSrv, this.loginSrv);
    processing = signal(false);
    data: TDocument[] = [];
    payrollData: PAYRow[] = [];
    checkData: Check[] = [];
    cashData: Check[] = [];
    displayedColumns = ['description', 'number', 'date', 'center'];
    payrollColumns = [
        'account',
        'description',
        'employee',
        'cCenter',
        'debit',
        'credit',
    ];
    bankColumns = ['number', 'date', 'bank'];
    cashColumns = ['number', 'date', 'debit', 'credit'];

    public pagination = PaginationModel.newInstance();

    constructor() {
        // this.pagination.onChange = () => this.showDocuments();
        this.pagination.pageSize = 15;
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('ACC_GENERATION');
        this.loginSrv.loadContext().subscribe(() => {
            this.form = this.fb.group({
                year: [{ value: this.loginSrv.appCtx.accYear, disabled: true }],
                period: [
                    {
                        value: this.loginSrv.appCtx.accPeriod,
                        disabled: true,
                    },
                ],
                journal: [null, Validators.required],
                genType: ['purchase', Validators.required],
                purchaseJr: [0],
                inventoryJr: [0],
                consumptionJr: [0],
                salesJr: [0],
                payrollJr: [0],
                transferInJr: [0],
                transferOutJr: [0],
                purchaseCount: [{ value: 0, disabled: true }],
                inventoryCount: [{ value: 0, disabled: true }],
                consumptionCount: [{ value: 0, disabled: true }],
                salesCount: [{ value: 0, disabled: true }],
                transferInCount: [{ value: 0, disabled: true }],
                transferOutCount: [{ value: 0, disabled: true }],
                payrollCount: [{ value: 0, disabled: true }],
            });

            const journals = [
                'purchaseJr',
                'inventoryJr',
                'consumptionJr',
                'salesJr',
                'payrollJr',
                'transferInJr',
                'transferOutJr',
            ];
            journals.forEach((journal) =>
                this.form.controls[journal].valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged(),
                        takeUntilDestroyed(this.#destroyRef),
                    )
                    .subscribe((val: number | null) => {
                        if (val) {
                            this.showDocuments(this.journalMap.get(journal));
                        }
                    }),
            );
        });
    }

    generate() {
        const payloads: GenerationInfo[] = [
            {
                journal: this.form?.controls['purchaseJr'].value,
                genType: 'purchase',
                genCode: this.PURCHASE,
            },
            {
                journal: this.form?.controls['inventoryJr'].value,
                genType: 'inventory',
                genCode: this.INVENTORY,
            },
            {
                journal: this.form?.controls['consumptionJr'].value,
                genType: 'consumption',
                genCode: this.CONSUMPTION,
            },
            {
                journal: this.form?.controls['salesJr'].value,
                genType: 'sales',
                genCode: this.SALES,
            },
            {
                journal: this.form?.controls['payrollJr'].value,
                genType: 'payroll',
                genCode: this.PAYROLL,
            },
            {
                journal: this.form?.controls['transferInJr'].value,
                genType: 'transfer_in',
                genCode: this.TRANSFER_IN,
            },
            {
                journal: this.form?.controls['transferOutJr'].value,
                genType: 'transfer_out',
                genCode: this.TRANSFER_OUT,
            },
        ].filter((j) => !!j.journal);

        this.processedDocuments.set([]);
        from(payloads)
            .pipe(
                concatMap((p) => {
                    this.processingDocument.set(p.genCode);
                    return this.generationSrv.generate(p).pipe(
                        tap(() => {
                            this.showDocuments(p.genCode);
                            this.processedDocuments.update((v) => [
                                ...v,
                                p.genCode,
                            ]);
                        }),
                    );
                }),
            )
            .subscribe({
                next: () => {
                    this.processingDocument.set(0);
                    this.snackBarSrv.showSuccessMessage();
                },
                error: (err) => {
                    this.shellSrv.setLoading(false);
                    throw err;
                },
            });
    }

    cancel() {
        const payloads: GenerationInfo[] = [
            {
                journal: this.form?.controls['purchaseJr'].value,
                genType: 'purchase',
                genCode: this.PURCHASE,
            },
            {
                journal: this.form?.controls['inventoryJr'].value,
                genType: 'inventory',
                genCode: this.INVENTORY,
            },
            {
                journal: this.form?.controls['consumptionJr'].value,
                genType: 'consumption',
                genCode: this.CONSUMPTION,
            },
            {
                journal: this.form?.controls['salesJr'].value,
                genType: 'sales',
                genCode: this.SALES,
            },
            {
                journal: this.form?.controls['payrollJr'].value,
                genType: 'payroll',
                genCode: this.PAYROLL,
            },
            {
                journal: this.form?.controls['transferInJr'].value,
                genType: 'transfer_in',
                genCode: this.TRANSFER_IN,
            },
            {
                journal: this.form?.controls['transferOutJr'].value,
                genType: 'transfer_out',
                genCode: this.TRANSFER_OUT,
            },
        ].filter((j) => !!j.journal);

        this.processedDocuments.set([]);
        this.confirmationSrv
            .confirm(
                'ACC_GENERATION_CANCEL',
                'ACC_GENERATION_CANCEL',
                true,
                true,
            )
            .subscribe({
                next: (res) => {
                    if (res) {
                        from(payloads)
                            .pipe(
                                concatMap((p) => {
                                    this.processingDocument.set(p.genCode);
                                    return this.generationSrv.cancel(p).pipe(
                                        tap(() => {
                                            this.processedDocuments.update(
                                                (v) => [...v, p.genCode],
                                            );
                                            this.showDocuments(p.genCode);
                                        }),
                                    );
                                }),
                            )
                            .subscribe(() => {
                                this.shellSrv.setLoading(false);
                                this.processingDocument.set(0);
                            });
                    }
                },
                error: (err) => {
                    this.shellSrv.setLoading(false);
                    this.processingDocument.set(0);
                    throw err;
                },
            });
    }

    private showTransactions(key: number) {
        const value = this.documentMap.get(key);
        const params = new HttpParams()
            .set('document', value?.code || 0)
            .set('stock', value?.stock);

        this.generationSrv
            .getList(
                this.pagination.page - 1,
                this.pagination.pageSize,
                null,
                null,
                params,
            )
            .subscribe({
                next: (res) => {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.processing.set(false);
                    if (this.totalsMap.get(key)) {
                        const totalKey = this.totalsMap.get(key);
                        this.form?.controls[totalKey].setValue(res.itemCount);
                    }
                    this.shellSrv.setLoading(false);
                },
                error: (err) => {
                    this.processing.set(false);
                    this.shellSrv.setLoading(false);
                    throw err;
                },
            });
    }

    private showPayrollLines() {
        this.generationSrv.getPayrollLines().subscribe({
            next: (res) => {
                this.processing.set(false);

                this.payrollData = res;
                this.payrollData.forEach((e) => {
                    e.debit = Math.max(e.amount, 0) || 0;
                    e.credit = Math.max(-e.amount, 0) || 0;
                });
                // add total line
                this.form.controls['payrollCount'].setValue(res.length);
                if (res.length > 0) {
                    const total = this.langSrv.translate('COMMON_TOTAL');
                    const debit = res
                        .map((e) => Math.max(e.amount, 0))
                        .reduce((a, b) => a + b);
                    const credit = res
                        .map((e) => Math.max(-e.amount, 0))
                        .reduce((a, b) => a + b);
                    this.payrollData.push({
                        account: total,
                        amount: 0,
                        debit: debit,
                        credit: credit,
                    });
                }
            },
            error: (err) => {
                this.processing.set(false);
                throw err;
            },
        });
    }

    private showBankPayments() {
        this.generationSrv.getChecks().subscribe({
            next: (res) => {
                this.processing.set(false);
                this.checkData = res;
                const bankId = res.length > 0 ? res[0].journal || null : null;
                this.form?.controls['journal']?.setValue(bankId);
                this.shellSrv.setLoading(false);
            },
            error: (err) => {
                this.processing.set(false);
                throw err;
            },
        });
    }

    private showCashPayments() {
        this.generationSrv.getCash().subscribe({
            next: (res) => {
                this.processing.set(false);
                this.cashData = res;
            },
            error: (err) => {
                this.processing.set(false);
                throw err;
            },
        });
    }

    showDocuments(key: number) {
        this.processing.set(true);
        this.showingBank.set(key === this.BANK);
        this.showingCash.set(key === this.CASH);
        this.showingPayroll.set(key === this.PAYROLL);
        this.showingTransactions.set(
            (key >= this.PURCHASE && key <= this.SALES) ||
                key >= this.TRANSFER_OUT,
        );

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

    goBack() {
        this.shellSrv.goBack();
    }
}

class ActiveJournalLookup extends DefaultAutoCompleteModel<Journal> {
    constructor(
        public srv: AccJournalsService,
        public loginSrv: LoginService,
    ) {
        super(srv);
    }

    override filterLoadedData = (x: Journal[]) =>
        x.filter(
            (j) => !j.blocked || j.blockYear < this.loginSrv.appCtx.accYear,
        );
}
