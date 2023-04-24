import {Component, ViewChild} from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {CCGroup, Lookup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable, of, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LoginService, User} from '@ss/common/api-common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {SalesOrderService} from '@ss/sales/api-sales-order';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import {UserListService} from '@ss/common/api-users';
import {SalesContractService} from '@ss/logistics/contracts';
import {MatDialog} from '@angular/material/dialog';
import {OrderLinesListComponent} from '@ss/sales/ui-order-lines';

@Component({
    selector: 'ss-ui-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class OrderDetailComponent extends BaseTransactionDetailComponent {
    @ViewChild(OrderLinesListComponent) orderList: OrderLinesListComponent;

    private importContractBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-file-arrow-up',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_CONTRACT',
        visible: true,
        click: () => this.importContract(),
    }
    private order: Transaction = null;
    public groups: CCGroup[];
    public dealerAutoCompleteModel  = new DefaultAutoCompleteModel<User>(this.usersService);
    public agentAutoCompleteModel   = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination');
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public projectLookup            = new DefaultAutoCompleteModel(this.projectSrv);

    constructor(public orderService: SalesOrderService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public usersService: UserListService,
                public lookupsSrv: LookupsService,
                private agentService: AgentService,
                public override loginSrv: LoginService,
                private payMethodSrv: PayMethodService,
                public override dialog: MatDialog,
                private projectSrv: SalesContractService) {
        super(orderService, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_ORDER');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv
            .getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importContractBtn);
    }

    // public override setupForm(form: Transaction) {
    //     if (!form.id) {
    //         form.id = 0;
    //         form.number = 0;
    //         form.userID = this.loginSrv.appCtx.id;
    //         form.dealer = form.userID;
    //         form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
    //     }
    //     this.projectSrv.setParentId(form?.agent || 0);
    //     this.order = form;
    //     this.isManager = this.loginSrv.appCtx.manager;
    //     return this.formBuilder.group({
    //         id: [form.id],
    //         document: [1025],
    //         centerId: [form.centerId || this.loginSrv.appCtx.center],
    //         date: [form.date, Validators.required],
    //         number: [form.number],
    //         payMethod: [form.payMethod, Validators.required],
    //         reference: [form.reference],
    //         referenceDocDate: [form.referenceDocDate],
    //         header: [form.header],
    //         footer: [form.footer],
    //         discountDescription: [form.discountDescription],
    //         fixedDiscount: [form.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
    //         dealer: [{ value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager }, Validators.required],
    //         agent: [form.agent, Validators.required],
    //         project: [form.project],
    //         locked: [form.locked || false, Validators.required],
    //         dirty: [!form.dirty || false, Validators.required]
    //     });
    // }

    override readForm(): Transaction {
        const form =  super.readForm();
        fillObject(this.order, form);
        form.dirty = !form.dirty;
        return form;
    }

    private importContract() {
        if (!this.importContractBtn.disabled) {
            this.orderService
                .consumeContract(this.id)
                .pipe(switchMap(_ => this.orderList? this.orderList.loadDetailLines() : of(null)))
                .subscribe(_ => {
                    this.shellSrv.setLoading(false);
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }

    finishLoading(e: Transaction) {
        super.finishLoading(e);
        this.importContractBtn.visible = !e.isValidated;
    }

    protected requireAgent(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected showImportButton(): boolean {
        return true;
    }
    protected importedDocuments(): Lookup[] {
        return [{ id: 6, description: 'SALES_ORDER'}];
    }
}
