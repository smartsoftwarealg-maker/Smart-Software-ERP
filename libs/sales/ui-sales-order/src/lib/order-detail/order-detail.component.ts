import { Component, ViewChild } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable, of, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {fillObject, LoginService} from '@ss/common/api-common';
import {SalesOrderService} from '@ss/sales/api-sales-order';
import {
    BaseTransactionDetailComponent, BaseTransactionLinesListComponent, DOC_QUOTATION,
    Transaction,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import {MatDialog} from '@angular/material/dialog';
import {OrderLinesListComponent} from '@ss/sales/ui-order-lines';

@Component({
    selector: 'ss-ui-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
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
    };
    private order: Transaction = null;
    public groups: CCGroup[];

    constructor(public orderService: SalesOrderService,
                public override detailSrv: TransactionLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public lookupsSrv: LookupsService,
                public override loginSrv: LoginService,
                public override dialog: MatDialog) {
        super(orderService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_ORDER');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv
            .getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importContractBtn);
    }


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
                .pipe(switchMap(_ => this.orderList? this.orderList.loadDetailLines() : of(null)),
                    switchMap(() =>
                        this.outlet?.component instanceof BaseTransactionLinesListComponent?
                            this.outlet?.component.loadDetailLines() :
                            of(0)))
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
        return [{ id: DOC_QUOTATION, description: 'LOGISTICS_PROFORMA'}];
    }
}
