import { Component, inject, OnInit } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryService} from '@ss/stock/api-inventory';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { BaseTransactionDetailComponent, Transaction } from '@ss/logistics/api-transaction';
import {LoginService, User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';
import {InventoryImportComponent} from '@ss/logistics/ui-doc-import';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'ss-inventory-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-detail.component.html'
})
export class InventoryDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private usersSrv =  inject(UserListService);
    private invImportBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importInventoryDocument(),
    };

    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);

    constructor(
        protected loginSrv: LoginService,
        protected dialog: MatDialog,
        public inventorySrv: InventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_EDIT_INVENTORY');
    }


    override setupForm(b: Transaction): UntypedFormGroup {
        if (b.id) {
            this.shellSrv.addButton(this.invImportBtn);
        }
        return super.setupForm(b);
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return false;
    }

    protected importedDocuments(): Lookup[] {
        return [];
    }

    protected requireAgent(): boolean {
        return false;
    }

    private importInventoryDocument() {
        if (!this.invImportBtn.disabled) {
            const id = this.form.controls['id']?.value;
            const dialogRef = this.dialog.open(InventoryImportComponent, {
                width: '600px',
                height: '360px',
                disableClose: true,
                data: {
                    transactId: id
                }
            });

            dialogRef
                .afterClosed()
                .subscribe(result => {
                    if (result && result['count']) {
                        this.snackBarSrv.showMessage('COMMON_SUCCESS');
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                    this.detail?.loadDetailLines().subscribe();

                    this.shellSrv.setLoading(false);
                });
        }
    }
}
