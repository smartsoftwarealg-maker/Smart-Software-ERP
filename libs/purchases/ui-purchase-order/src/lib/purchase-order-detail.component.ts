import {Component, OnInit, ViewChild} from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {CCGroup, Currency, CurrencyService, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LoginService, User} from '@ss/common/api-common';
import {DatePipe} from '@angular/common';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {PurchaseOrderService} from '@ss/purchases/api-purchase-order';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {UserListService} from '@ss/common/api-users';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {MatDialog} from '@angular/material/dialog';
import {PurchaseOrderLinesListComponent} from './purchase-order-lines-list.component';
import {SalesContractService} from '@ss/logistics/contracts';

@Component({
    selector: 'ss-ui-order-detail',
    templateUrl: './purchase-order-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class PurchaseOrderDetailComponent extends BaseEntityDetailComponent<Transaction> implements OnInit {
    private order: Transaction = null;
    private importContractBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-file-arrow-up',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_CONTRACT',
        visible: true,
        click: () => this.importContract(),
    }

    @ViewChild(PurchaseOrderLinesListComponent) detail: PurchaseOrderLinesListComponent;
    public projectLookup            = new DefaultAutoCompleteModel(this.projectSrv);
    public isManager = false;
    public groups: CCGroup[];
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination')
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv)
    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    }

    constructor(public orderService: PurchaseOrderService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public usersService: UserListService,
                public lookupsSrv: LookupsService,
                private supplierSrv: SupplierService,
                private loginService: LoginService,
                private payMethodSrv: PayMethodService,
                private loginSrv: LoginService,
                private dialog: MatDialog,
                private docImportService: DocImportService,
                private currencySrv: CurrencyService,
                private projectSrv: SalesContractService) {
        super(orderService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PURCHASES_EDIT_ORDER');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public override setupForm(form: Transaction) {
        // Make sure to update the template if you edit the configuration here
        this.order = form;
        this.importBtn.disabled = form.agent == null || form.agent === undefined;
        if (!form.id) {
            form.id = 0;
            form.number = 0;
            form.userID = this.loginService.appCtx.id;
            form.dealer = form.userID;
            form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
        }
        this.order = form;
        this.isManager = this.loginService.appCtx.manager;
        this.projectSrv.setParentId(form?.agent || 0);
        return this.formBuilder.group({
            id: [form.id || 0],
            document: [0],
            centerId: [form.centerId || this.loginSrv.appCtx.center],
            date: [form.date, Validators.required],
            number: [form.number],
            reference: [form.reference],
            referenceDocDate: [form.referenceDocDate],
            payMethod: [form.payMethod, Validators.required],
            header: [form.header],
            footer: [form.footer],
            discountDescription: [form.discountDescription],
            fixedDiscount: [form.fixedDiscount || 0.0],
            fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
            currency: [form.currency || 10, Validators.required],
            currencyRate: [form.currencyRate || 1],
            dealer: [{value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager}, Validators.required],
            project: [form.project],
            agent: [form.agent, Validators.required],
        });
    }

    override readForm(): Transaction {
        const form = super.readForm();
        fillObject(this.order, form)
        return form;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
        this.shellSrv.addButton(this.importBtn);
        this.shellSrv.addButton(this.importContractBtn);
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
            const agentId = this.form.controls['agent'].value;
            const dialogRef = this.dialog.open(DocImportComponent, {
                width: '70%',
                height: '55%',
                data: { documentList: [ { id: 10, description: 'PURCHASES_PURCHASE_REQUEST' }],
                    agentId: agentId}
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['document']  && result['number']) {
                    const document = result['document'];
                    const number   = result['number'];
                    this.docImportService
                        .importDoc(document, number, this.order.id)
                        .pipe(switchMap(_ => this.detail?.loadDetailLines()))
                        .subscribe({
                            next: res => {
                                this.snackBarSrv.showMessage('COMMON_SUCCESS');
                                this.shellSrv.setLoading(false);
                            },
                            error: err => {
                                this.snackBarSrv.showMessage('COMMON_FAILURE', true);
                                this.shellSrv.setLoading(false);
                            }
                        });
                }
            });
        }
    }

    private importContract() {
        if (!this.importBtn.disabled) {
            this.orderService
                .consumeContract(this.id)
                .pipe(switchMap(_ => this.detail? this.detail.loadDetailLines() : of(null)))
                .subscribe(_ => {
                    this.shellSrv.setLoading(false);
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }
}
