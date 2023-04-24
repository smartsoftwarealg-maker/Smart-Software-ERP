import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import {CCGroup, Currency, CurrencyService, Lookup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LoginService, User} from '@ss/common/api-common';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {PurchaseRequestService} from '../purchase-request.service';
import {WorkflowDialogComponent} from '@ss/workflow';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'ss-purchase-request-detail',
    templateUrl: './purchase-request-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class PurchaseRequestDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private order: Transaction = null;
    public groups: CCGroup[];
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination')
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv)


    constructor(public orderService: PurchaseRequestService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public usersService: UserListService,
                public lookupsSrv: LookupsService,
                private supplierSrv: SupplierService,
                private payMethodSrv: PayMethodService,
                protected override loginSrv: LoginService,
                protected override dialog: MatDialog,
                private currencySrv: CurrencyService) {
        super(orderService, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PURCHASES_PURCHASE_REQUEST');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    protected showImportButton(): boolean {
        return false;
    }
    protected requireAgentToImportDocument(): boolean {
        return false;
    }
    protected requireAgent(): boolean {
        return false;
    }
    protected importedDocuments(): Lookup[] {
        return [];
    }

    // public override setupForm(form: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     if (!form.id) {
    //         form.id = 0;
    //         form.number = 0;
    //         form.userID = this.loginSrv.appCtx.id;
    //         form.dealer = form.userID;
    //         form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
    //     }
    //     this.order = form;
    //     this.isManager = this.loginSrv.appCtx.manager;
    //     this.isEditable = this.isEditable && !form.isValidated;
    //     return this.formBuilder.group({
    //         id: [form.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [form.date, Validators.required],
    //         number: [form.number],
    //         reference: [form.reference],
    //         referenceDocDate: [form.referenceDocDate],
    //         payMethod: [form.payMethod],
    //         header: [form.header],
    //         footer: [form.footer],
    //         discountDescription: [form.discountDescription],
    //         fixedDiscount: [form.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
    //         currency: [form.currency || 10, Validators.required],
    //         currencyRate: [form.currencyRate || 1],
    //         dealer: [{value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager}, Validators.required],
    //         agent: [form.agent],
    //     });
    // }

    override readForm(): Transaction {
        return this.form.getRawValue();
    }
    //
    // private sendMessage() {
    //     if (!this.sendBtn.disabled) {
    //         const id = this.form.controls['id'].value;
    //         const dialogRef = this.dialog.open(WorkflowDialogComponent, {
    //             width: '350px',
    //             height: '500px',
    //             data: {transacId: id, senderId: this.loginSrv.appCtx.id}
    //         });
    //
    //         dialogRef.afterClosed().subscribe(result => {
    //             if (result && result['message']) {
    //                 this.snackBarSrv.showSuccessMessage();
    //             } else {
    //                 this.snackBarSrv.showFailureMessage();
    //             }
    //         });
    //     }
    // }
    //
    // override ngOnInit() {
    //     super.ngOnInit();
    //     this.shellSrv.addButton(this.sendBtn);
    // }
}
