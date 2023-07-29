import { Component } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { Observable, of, switchMap } from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent, BaseTransactionLinesListComponent, DOC_SUPPLIER_QUOTATION,
    Transaction
} from '@ss/logistics/api-transaction';
import {PurchaseOrderService} from '@ss/purchases/api-purchase-order';
import {MatDialog} from '@angular/material/dialog';
import { PurchaseOrderLinesService } from '../purchase-order-lines.service';
import { Project } from '@ss/logistics/contracts';

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
        this.projectLookup.onObjectSelected = e => this.onProject(e);
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    override setupForm(b: Transaction): FormGroup {
        this.projectSrv.setParentId(b?.agent || 0);
        return super.setupForm(b);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
        this.shellSrv.addButton(this.importContractBtn);
    }

    private importContract() {
        if (!this.importContractBtn.disabled && this.form.controls['project'].value) {
            this.orderService
                .consumeContract(this.id)
                .pipe(switchMap(() =>
                    this.outlet?.component instanceof BaseTransactionLinesListComponent?
                        this.outlet?.component.loadDetailLines() :
                        of(0)))
                .subscribe(() => {
                    this.executionRef++;
                    this.shellSrv.setLoading(false);
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }

    protected importedDocuments(): Lookup[] {
        return [
            { id: DOC_SUPPLIER_QUOTATION, description: 'PURCHASES_QUOTATION'}
        ];
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

    finishLoading(e: Transaction) {
        super.finishLoading(e);
        this.importContractBtn.disabled = !e.project;
    }

    private onProject(p: Project) {
        this.importContractBtn.disabled = !p?.id;
    }
}
