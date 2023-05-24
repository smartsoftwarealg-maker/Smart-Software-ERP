import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable, of, switchMap} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Transaction} from './transaction';
import {WorkflowDialogComponent} from '@ss/workflow';
import { LoginService, User } from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {Directive, inject} from '@angular/core';
import { Currency, CurrencyService, Lookup, LookupsService, PayMethod } from '@ss/common/api-lookup';
import { Agent, AgentService, BranchService, ConsumerService, SupplierService } from '@ss/logistics/api-agent';
import { PayMethodService } from '@ss/logistics/api-logistics-common';
import { UserListService } from '@ss/common/api-users';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { SalesContractService } from '@ss/logistics/contracts';

@Directive()
export abstract class BaseTransactionDetailComponent extends BaseEntityDetailComponent<Transaction>  {
    private agentService = inject(AgentService);
    private payMethodSrv = inject(PayMethodService);
    private usersSrv = inject(UserListService);
    private consumerSrv = inject(ConsumerService);
    private branchService = inject(BranchService);
    private _isManager = false;
    private transaction: Transaction = null;
    private docImportService: DocImportService = inject(DocImportService);
    private supplierSrv = inject(SupplierService);

    protected currencySrv =  inject(CurrencyService);
    protected projectSrv = inject(SalesContractService);


    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    };

    private sendBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-envelope',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_SEND_MESSAGE',
        visible: true,
        click: () => this.sendMessage(),
    };

    protected lookupsSrv =  inject(LookupsService);

    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination');
    public projectLookup            = new DefaultAutoCompleteModel(this.projectSrv);
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public supplierAutoCompleteModel   = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    public consumerAutoCompleteModel   = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    public executionRef = 0;
    constructor(public entitySrv: BaseEntityService<Transaction>,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                protected loginSrv: LoginService,
                protected dialog: MatDialog,
                public override title: string) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, title);
    }

    public override canDeactivate(): Observable<boolean> {
        const parent = +(this.router.getCurrentNavigation().extractedUrl.queryParamMap.get('parent') || '0');
        return this.id === 0 || parent === this.id?
            of(true) :
            this.entitySrv
                .get(this.id)
                .pipe(
                    map(res => {
                        if (res) {
                            res.dirty = res?.dirty && res?.document >= 200 && res?.document <= 800;
                        }
                        return res;
                    }),
                    tap(res => {
                        if (res?.dirty && this.form)  {
                            this.form.markAsDirty({onlySelf: false});
                            this.form.markAsUntouched({onlySelf: false});
                            this.snackBarSrv.showFailureMessage('COMMON_SAVE_REQUIRED');
                        }
                    }),
                    switchMap(res => res?.dirty? of(false): super.canDeactivate()));
    }

    override readForm(): Transaction {
        return this.form.getRawValue();
    }

    protected abstract showImportButton(): boolean;
    protected abstract requireAgentToImportDocument(): boolean;
    protected abstract requireAgent(): boolean;
    protected abstract importedDocuments(): Lookup[];

    private sendMessage() {
        if (!this.sendBtn.disabled) {
            const id = this.form.controls['id'].value;
            const dialogRef = this.dialog.open(WorkflowDialogComponent, {
                width: '350px',
                height: '500px',
                data: { transacId: id, senderId: this.loginSrv.appCtx.id }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['message']) {
                    this.snackBarSrv.showSuccessMessage();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
        }
    }
    private importDocument() {
        if (!this.importBtn.disabled) {
            const agentId = this.form.controls['agent'].value;
            const dialogRef = this.dialog.open(DocImportComponent, {
                width: '700px',
                height: '55%',
                data: { documentList: this.importedDocuments(), agentId: agentId }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['document']  && result['number']) {
                    const document = result['document'];
                    const number   = result['number'];
                    this.docImportService
                        .importDoc(document, number, this.transaction.id)
                        // .pipe(switchMap(_ => this.detail?.loadDetailLines()))
                        .subscribe({
                            next: res => {
                                this.executionRef++;
                                this.snackBarSrv.showMessage('COMMON_SUCCESS');
                            },
                            error: err => {
                                this.snackBarSrv.showMessage('COMMON_FAILURE', false);
                                throw err;
                            }
                        });
                }
            });
        }
    }
    public override setupForm(b: Transaction) {
        if (!b.id) {
            b.id = 0;
            b.number = 0;
            b.userID = this.loginSrv.appCtx.id;
            b.dealer = b.userID;
            b.date = new Date();
        } else {
            this.shellSrv.addButton(this.sendBtn);
            if (this.showImportButton()) {
                this.shellSrv.addButton(this.importBtn);
            }
        }
        this._isManager = this.loginSrv.appCtx.manager;

        this.isEditable = this.isEditable && !b.isValidated;
        this.saveButton.visible = this.saveButton.visible && !b.isValidated;
        this.importBtn.visible = b.id > 0 && !b.isValidated;
        this.importBtn.disabled = this.requireAgentToImportDocument() && (b.agent === null || b.agent === undefined);
        this.transaction = b;
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            centerId: [0 || this.loginSrv.appCtx.center],
            date: [b.date || new Date(), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            payMethod: [b.payMethod],
            header: [b.header],
            footer: [b.footer],
            currency: [b.currency || 10],
            currencyRate: [b.currencyRate || 1],
            discountDescription: [b.discountDescription],
            fixedDiscount: [b.fixedDiscount || 0.0],
            fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
            dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this._isManager }, Validators.required],
            agent: [b.agent, this.requireAgent()? Validators.required : null],
            project: [b.project],
            locked: [b.locked || false, Validators.required],
            dirty: [!b.dirty || false, Validators.required]
        });
    }

    get isManager() {
        return this._isManager;
    }
}
