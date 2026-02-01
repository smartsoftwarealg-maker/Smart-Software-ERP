import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import {
    AbstractControl, ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {
    AccFileService,
    AccPoliciesService,
    ACCPolicy,
    ACCTransactionLine,
    AccTransactionLineService,
    AnnexCodeService
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { map, Observable, of } from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Account, AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {AgentService} from '@ss/logistics/api-agent';
import {CostCenterService} from '@ss/logistics/api-cost-center';



import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-transaction-lines-detail',
    templateUrl: './transaction-lines-detail.component.html',
    styleUrls: ['./transaction-lines-detail.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslatePipe
    ]
})
export class TransactionLinesDetailComponent implements OnInit {
    private ccSrv = inject(CostCenterService);
    private router = inject(Router);
    private fileSrv = inject(AccFileService);
    private customerSrv = inject(AgentService);
    private loginSrv = inject(LoginService);
    private annexCodeSrv = inject(AnnexCodeService);
    private accPolicySrv = inject(AccPoliciesService);
    private accountSrv =  inject(AccountService);

    private formValidator: ValidatorFn =
        (group: AbstractControl): ValidationErrors | null => {
            let result = null;
            if (this.selectedAccount()) {
                if (!group.get('customerId').value && this.selectedAccount()?.customerCode) {
                    group.get('customerId').setErrors({invalid: true});
                    result = {invalid: true};
                }
                if (!group.get('accountId').value) {
                    group.get('accountId').setErrors({ invalid: true });
                    result = {invalid: true};
                }
                if (group.get('debit').value === 0 && group.get('credit').value === 0) {
                    group.get('debit').setErrors({ invalid: true });
                    group.get('credit').setErrors({ invalid: true });
                    result = {invalid: true};
                }
                if (!group.get('reference').value && this.selectedAccount()?.analyzed) {
                    group.get('reference').setErrors({invalid: true});
                    result = {invalid: true};
                }
                if (!group.get('costCenterId').value && this.selectedAccount()?.ccRequired) {
                    group.get('costCenterId').setErrors({invalid: true});
                    result = {invalid: true};
                }
                if (this.selectedAccount()?.accountNo.startsWith('51') && this.accPolicy?.analyzeChecks && !group.get('checkNo').value) {
                    group.get('checkNo').setErrors({invalid: true});
                    result = {invalid: true};
                }
            }
            return result;
        };

    accountLookupModel  = new AccountAutocompleteModel(this.accountSrv);
    customerLookupModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    ccLookupModel       = new DefaultAutoCompleteModel(this.ccSrv, 'id', 'code');
    annexCodeLookupMode = new DefaultAutoCompleteModel(this.annexCodeSrv, 'code');
    accPolicy: ACCPolicy = null;
    public form: UntypedFormGroup | null = null;
    id = 0;
    fileId = 0;
    parentId = 0;
    selectedAccount  = signal<Account|null>(null);
    costCenterRequited = computed(() => this.selectedAccount()?.ccRequired === true && this.accPolicy.use_management);
    customerCodeRequited = computed(() => this.selectedAccount()?.customerCode ||false);
    referenceRequired = computed(() => this.selectedAccount()?.analyzed && this.accPolicy.analyzeAccounts);
    checkNoRequired = computed(() => this.selectedAccount()?.accountNo.startsWith('51') && this.accPolicy?.analyzeChecks);
    showReference2 = computed(() => this.accPolicy?.showReference2);

    readonly isClosed = this.fileSrv.accFile.closed;
    saveDisabled = signal(true);
    saving = signal(false);

    constructor(
        public entitySrv: AccTransactionLineService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        this.accountLookupModel.onObjectSelected = (obj) => this.accountSelected(obj);
    }

    setupForm(e: ACCTransactionLine): UntypedFormGroup {
        return this.formBuilder.group({
            id:           [e.id || 0],
            parentId:     [e.parentId||this.parentId],
            fileId:       [e.fileId || this.loginSrv.appCtx.accFile],
            oid:          [e.oid || 0],
            accountNo:    [e.accountNo],
            customer:     [e.customer],
            lineNumber:   [e.lineNumber || 1],
            c_o_d:        [e.c_o_d],
            balance:      [e.balance],
            debit:        [{ value: e.balance > 0? e.balance : 0.0, disabled: e.balance < 0 }],
            credit:       [{ value: e.balance < 0? -e.balance : 0.0, disabled: e.balance > 0 } ],
            reference:    [e.reference],
            reference2:    [e.reference2],
            checkNo:      [e.checkNo],
            description:  [e.description, Validators.required],
            customerId:   [e.customerId],
            accountId:    [e.accountId, Validators.required],
            costCenterId: [e.costCenterId]
        }, { validators: this.formValidator });
    }

    ngOnInit() {
        this.load();
    }

    private accountSelected(a: Account) {
        this.selectedAccount.set(a);
        this.form.get('accountNo')?.setValue(a?.accountNo);
    }


    public loadEntity(id: number): Observable<ACCTransactionLine> {
        if (id == null) {
            this.shellSrv.goBack();
            return of(null);
        }
        if (id === 0) {
            return this.entitySrv
                .getPieceSummary(this.entitySrv.getParentId()||0)
                .pipe(map(res => {
                    return <ACCTransactionLine> {
                        id: 0,
                        description: res.description,
                        balance:     -(res.balance || 0)
                    };
                }));
        }
        return this.entitySrv.get(id);
    }

    public finishLoading(e: ACCTransactionLine) {
        this.accountSrv
            .get(e.accountId)
            .subscribe(res => this.selectedAccount.set(res));
        this.form = this.setupForm(e);
        this.saveDisabled.set(this.isClosed);
    }


    public load() {
        this.loginSrv
            .loadContext()
            .pipe(
                switchMap(_ => this.accPolicySrv.get(this.loginSrv.appCtx.center)),
                tap(pol => this.accPolicy = pol),
                switchMap(_ => this.route.parent.parent.params),
                tap(p => {
                    const id = +p['id'] || 0;
                    this.parentId = id;
                    this.fileId = this.loginSrv.appCtx.accFile;
                }),
                switchMap(_ => this.route.params),
                switchMap(p => {
                    this.id = +p['id'];
                    return this.loadEntity(this.id || 0);
                })
            ).subscribe({
                next: entity => {
                    if (entity) {
                        this.finishLoading(entity);
                    }
                },
                error: error => {
                    this.shellSrv.setLoading(false);
                    this.shellSrv.showRetry(() => this.load());
                    throw error;
                }
            });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.altKey && event.key === 's') {
            this.save();
            event.preventDefault();
        } else if (event.altKey && event.key === 'c') {
            this.cancel();
            event.preventDefault();
        }
    }

    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.goBack();
            }
        });
    }

    protected goBack() {
        this.router.navigate(['..'], { relativeTo: this.route }).then();
    }

    save() {
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_FORM');
            return;
        }

        // if (old * val.balance < 0) {
        //     console.log(old, val.balance, val.debit, val.credit);
        // }
        if (this.entitySrv.getParentId() != null) {
            this.saving.set(true);
            const val = this.form.getRawValue();
            val.balance = val.debit || 0 - val.credit || 0;
            val.id = this.id;
            const obs: Observable<any> = val.id === 0
                ? this.entitySrv
                    .add(val)
                    .pipe(tap(i => {
                        this.id = i;
                        val.id = i;
                    }))
                : this.entitySrv.update(val);
            obs.subscribe({
                next: () => {
                    this.form.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                    // this.shellSrv.goBack();
                    this.entitySrv.updateStatus();
                    this.goBack();
                },
                error: err => {
                    this.saving.set(false);
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
        } else {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_SELECTION');
        }
    }

    onDebitChange(value: string) {
        this.onAmountChange(+value, 'credit');
    }

    onCreditChange(value: string) {
        this.onAmountChange(+value, 'debit');
    }

    private onAmountChange(balance: number, ctrl: string) {
        if (balance > 0.0) {
            this.form.controls[ctrl].setValue(0);
            this.form.controls[ctrl].disable({onlySelf: true, emitEvent: false});
        } else {
            this.form.controls[ctrl].enable();
        }
    }
}


