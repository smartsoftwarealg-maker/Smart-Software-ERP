import { Component } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import { BaseTransactionDetailComponent, Transaction } from '@ss/logistics/api-transaction';
import {PurchaseOrderService} from '@ss/purchases/api-purchase-order';
import {MatDialog} from '@angular/material/dialog';
import { PurchaseOrderLinesService } from '../purchase-order-lines.service';

@Component({
    selector: 'ss-ui-order-detail',
    templateUrl: './purchase-order-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class PurchaseOrderDetailComponent extends BaseTransactionDetailComponent {

    private importContractBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-file-arrow-up',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_CONTRACT',
        visible: true,
        click: () => this.importContract(),
    };

    // private sendBtn: ToolbarButton = {
    //     disabled: false,
    //     icon: 'fa-solid fa-envelope',
    //     keepOnToolbar: KeepOnToolbar.DYNAMIC,
    //     label: 'LOGISTICS_SEND_MESSAGE',
    //     visible: true,
    //     click: () => this.sendMessage(),
    // }

    public groups: CCGroup[];

    constructor(public orderService: PurchaseOrderService,
                public override detailSrv: PurchaseOrderLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public lookupsSrv: LookupsService,
                protected loginSrv: LoginService,
                protected dialog: MatDialog) {
        super(orderService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PURCHASES_EDIT_ORDER');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    override setupForm(b: Transaction): FormGroup<any> {
        this.projectSrv.setParentId(b?.agent || 0);
        return super.setupForm(b);
    }

    // public override setupForm(form: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     this.order = form;
    //     this.importBtn.disabled = form.agent == null || !form.agent;
    //     this.isEditable = this.isEditable && !form.isValidated;
    //     if (!form.id) {
    //         form.id = 0;
    //         form.number = 0;
    //         form.userID = this.loginSrv.appCtx.id;
    //         form.dealer = form.userID;
    //         form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
    //     }
    //     this.order = form;
    //     this.isManager = this.loginSrv.appCtx.manager;
    //     this.projectSrv.setParentId(form?.agent || 0);
    //     return this.formBuilder.group({
    //         id: [form.id || 0],
    //         document: [0],
    //         centerId: [form.centerId || this.loginSrv.appCtx.center],
    //         date: [form.date, Validators.required],
    //         number: [form.number],
    //         reference: [form.reference],
    //         referenceDocDate: [form.referenceDocDate],
    //         payMethod: [form.payMethod, Validators.required],
    //         header: [form.header],
    //         footer: [form.footer],
    //         discountDescription: [form.discountDescription],
    //         fixedDiscount: [form.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
    //         currency: [form.currency || 10, Validators.required],
    //         currencyRate: [form.currencyRate || 1],
    //         dealer: [{value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager}, Validators.required],
    //         project: [form.project],
    //         agent: [form.agent, Validators.required],
    //     });
    // }
    //
    // override readForm(): Transaction {
    //     const form = super.readForm();
    //     fillObject(this.order, form)
    //     return form;
    // }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
        this.shellSrv.addButton(this.importContractBtn);
    }

    // private importDocument() {
    //     if (!this.importBtn.disabled) {
    //         const agentId = this.form.controls['agent'].value;
    //         const dialogRef = this.dialog.open(DocImportComponent, {
    //             width: '70%',
    //             height: '55%',
    //             data: { documentList: [ { id: 10, description: 'PURCHASES_PURCHASE_REQUEST' }],
    //                 agentId: agentId}
    //         });
    //
    //         dialogRef.afterClosed().subscribe(result => {
    //             if (result && result['document']  && result['number']) {
    //                 const document = result['document'];
    //                 const number   = result['number'];
    //                 this.docImportService
    //                     .importDoc(document, number, this.order.id)
    //                     .pipe(switchMap(_ => this.detail?.loadDetailLines()))
    //                     .subscribe({
    //                         next: res => {
    //                             this.snackBarSrv.showMessage('COMMON_SUCCESS');
    //                             this.shellSrv.setLoading(false);
    //                         },
    //                         error: err => {
    //                             this.snackBarSrv.showMessage('COMMON_FAILURE', true);
    //                             this.shellSrv.setLoading(false);
    //                         }
    //                     });
    //             }
    //         });
    //     }
    // }

    private importContract() {
        if (!this.importContractBtn.disabled) {
            this.orderService
                .consumeContract(this.id)
                .subscribe(_ => {
                    this.executionRef++;
                    this.shellSrv.setLoading(false);
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 10, description: 'PURCHASES_PURCHASE_REQUEST' }];
    }

    protected requireAgent(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected showImportButton(): boolean {
        return false;
    }
}
