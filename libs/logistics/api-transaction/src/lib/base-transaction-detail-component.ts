import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {
    ActivatedRoute, NavigationEnd,
    Router, RouterEvent, RouterOutlet
} from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { filter, Observable, of, switchMap } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Transaction } from './transaction';
import { WorkflowDialogComponent } from '@ss/workflow';
import { LoginService, User } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { DocImportComponent, DocImportService } from '@ss/logistics/ui-doc-import';
import { Directive, inject, OnInit, ViewChild } from '@angular/core';
import { CCGroup, Currency, CurrencyService, Lookup, LookupsService, PayMethod } from '@ss/common/api-lookup';
import {
    Agent,
    AgentService,
    BranchService,
    ConsumerService,
    CustomerService,
    SupplierService
} from '@ss/logistics/api-agent';
import { PayMethodService } from '@ss/logistics/api-logistics-common';
import { UserListService } from '@ss/common/api-users';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { TransactionLinesClass } from './transaction-lines.class';
import { BaseTransactionLinesListComponent } from './base-transaction-lines-list.component';
import { PurchaseContractService, SalesContractService } from '@ss/logistics/contracts';
import { OptionService } from '@ss/logistics/ui-options';

@Directive()
export abstract class BaseTransactionDetailComponent extends BaseEntityDetailComponent<Transaction> implements OnInit {
    private optionSrv = inject(OptionService);
    private agentSrv = inject(AgentService);
    private payMethodSrv = inject(PayMethodService);
    private usersSrv = inject(UserListService);
    private consumerSrv = inject(ConsumerService);
    private branchSrv = inject(BranchService);
    private _isManager = false;
    private transaction: Transaction = null;
    private docImportService: DocImportService = inject(DocImportService);
    private supplierSrv = inject(SupplierService);
    private customerSrv = inject(CustomerService);

    protected currencySrv = inject(CurrencyService);
    protected purchaseProjectSrv = inject(PurchaseContractService);
    protected salesProjectSrv = inject(SalesContractService);

    @ViewChild(RouterOutlet) outlet: RouterOutlet | null = null;

    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument()
    };

    private sendBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-envelope',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_SEND_MESSAGE',
        visible: true,
        click: () => this.sendMessage()
    };

    protected lookupsSrv = inject(LookupsService);

    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public agentLookup = new DefaultAutoCompleteModel<Agent>(this.agentSrv, 'id', 'denomination');
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination');
    public supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    public purchaseProjectLookup = new DefaultAutoCompleteModel(this.purchaseProjectSrv);
    public salesProjectLookup = new DefaultAutoCompleteModel(this.salesProjectSrv);
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public transporterAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    public consumerLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    public branchLookup = new DefaultAutoCompleteModel(this.branchSrv, 'id', 'denomination');
    public executionRef = 0;
    public formId = 0;
    public groups: CCGroup[];

    protected constructor(
        public entitySrv: BaseEntityService<Transaction>,
        public detailSrv: TransactionLinesClass,
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
        this.agentLookup.onObjectSelected = e => this.updateProjectLookups(e?.id || 0);
        this.supplierLookup.onObjectSelected = e => this.updateProjectLookups(e?.id || 0);
        this.customerLookup.onObjectSelected = e => this.updateProjectLookups(e?.id || 0);
    }

    private updateProjectLookups(id: number) {
        this.purchaseProjectSrv.setParentId(id);
        this.salesProjectSrv.setParentId(id);
        if (id) {
            this.salesProjectLookup.filter('').subscribe();
            this.purchaseProjectLookup.filter('').subscribe();
        }
    }

    public override canDeactivate(): Observable<boolean> {
        const parent = +(this.router.getCurrentNavigation().extractedUrl.queryParamMap.get('parent') || '0');
        return parent === 0 || !this.isEditable ?
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
                        if (res?.dirty && this.form) {
                            this.form.markAsDirty({ onlySelf: false });
                            this.form.markAsUntouched({ onlySelf: false });
                            this.snackBarSrv.showFailureMessage('COMMON_SAVE_REQUIRED');
                        }
                    }),
                    switchMap(res => res?.dirty ? of(false) : super.canDeactivate()));
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
                data: {
                    transacId: id,
                    senderId: this.loginSrv.appCtx.id,
                    validated: this.transaction.isValidated,
                    documentId: this.form.controls['document'].value
                }
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
                width: '720px',
                height: '55%',
                data: { documentList: this.importedDocuments(), agentId: agentId },
                disableClose: true
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['document'] && result['number']) {
                    const document = result['document'];
                    const number = result['number'];
                    this.docImportService
                        .importDoc(document, number, this.transaction.id)
                        .pipe(
                            switchMap(() => this.loadEntity(this.queryId)),
                            tap(ent => this.form = this.setupForm(ent)),
                            switchMap(() =>
                                this.outlet?.component instanceof BaseTransactionLinesListComponent ?
                                    this.outlet?.component.loadDetailLines() :
                                    of(0)))
                        .subscribe({
                            next: () => {
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
        }

        this.importBtn.disabled = !b?.id;

        this.detailSrv.setParentId(b.id || 0);
        this.purchaseProjectSrv.setParentId(b.agent || 0);
        this._isManager = this.loginSrv.appCtx.manager;
        this.formId = b.id || 0;

        this.isEditable = this.isEditable && !b.isValidated;
        this.saveButton.visible = this.saveButton.visible && !b.isValidated;
        this.importBtn.visible = b.id > 0 && !b.isValidated;
        this.importBtn.disabled = this.requireAgentToImportDocument() && (b.agent === null || b.agent === undefined);
        this.detailSrv.editable = this.isEditable;
        this.transaction = b;
        return this.formBuilder.group({
            id: [b.id],
            document: [b.document || 0],
            centerId: [0 || this.loginSrv.appCtx.center],
            date: [b.date || new Date(), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            payMethod: [b.payMethod],
            header: [b.header],
            footer: [b.footer],
            currency: [b.currency || this.optionSrv.options?.defaultCurrency],
            currencyRate: [b.currencyRate || 1],
            discountDescription: [b.discountDescription],
            fixedDiscount: [b.fixedDiscount || 0.0],
            discount: [b.discount || 0.0],
            fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
            dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this._isManager }, Validators.required],
            agent: [b.agent, this.requireAgent() ? Validators.required : null],
            altAgent: [b.altAgent],
            project: [b.project],
            locked: [b.locked || false, Validators.required],
            dirty: [!b.dirty || false, Validators.required],
            driver: [b.driver],
            transporter: [b.transporter],
            license: [b.license],
            licenseDate: [b.licenseDate],
            licenseIssuer: [b.licenseIssuer],
            plateNumber: [b.plateNumber],
            deliveryTime: [b.deliveryTime]
        });
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x),
                  switchMap(() => this.optionSrv.get(this.loginSrv.appCtx.center)),
                  tap(res => this.optionSrv.options = res));
        //
        // return this.optionSrv
        //     .get(this.loginSrv.appCtx.center)
        //     .pipe(tap(res => this.optionSrv.options = res));
    }

    get isManager() {
        return this._isManager;
    }

    override ngOnInit() {
        super.ngOnInit();
        const sub = this.router.events.pipe(
            filter((e: object): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((e: RouterEvent) => {
            if (e instanceof NavigationEnd) {
                this.disableControls(e.url);
            }
        });
        this.subscriptions.push(sub);
        this.disableControls(this.router.url);
        this.shellSrv.addButton(this.sendBtn);
        if (this.showImportButton()) {
            this.shellSrv.addButton(this.importBtn);
        }

        this.customerSrv.activeOnly = true;
        this.agentSrv.activeOnly = true;
        this.supplierSrv.activeOnly = true;
    }

    protected disableControls(url: string) {
        const enabled = url.indexOf('-detail') < 0;
        this.saveButton.visible = enabled;
        this.shellSrv.setGoBackEnabled(enabled);
    }

    protected goBack() {
        if (this.form.controls['id'].value > 0) {
            super.goBack();
        } else {
            this.router.navigate(['..', this.queryId], { relativeTo: this.route }).then();
        }
    }

    finishLoading(e: Transaction) {
        super.finishLoading(e);
        this.updateProjectLookups(e?.agent || 0);
    }
}
