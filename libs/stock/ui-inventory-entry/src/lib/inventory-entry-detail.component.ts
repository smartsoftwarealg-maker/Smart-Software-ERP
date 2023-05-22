import { Component, inject, ViewChild } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryEntryService} from '@ss/stock/api-inventory-entry';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';
import {BaseTransactionDetailComponent} from '@ss/logistics/api-transaction';
import {MatDialog} from '@angular/material/dialog';
import {InventoryLinesListComponent} from '@ss/stock/ui-inventory-lines';
import {InventoryImportComponent} from '@ss/logistics/ui-doc-import';


@Component({
    selector: 'ss-inventory-entry-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-entry-detail.component.html'
})
export class InventoryEntryDetailComponent extends BaseTransactionDetailComponent {
    @ViewChild(InventoryLinesListComponent) _detail: InventoryLinesListComponent;
    private invImportBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'COMMON_LOAD_EXCEL',
        visible: true,
        click: () => this.importInventoryDocument(),
    };



    constructor(
        private langSrv: LanguageService,
        protected loginSrv: LoginService,
        protected dialog: MatDialog,
        public inventoryService: InventoryEntryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(inventoryService, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_INVENTORY_ENTRY');
    }

    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.invImportBtn);
    }

    // public override setupForm(b: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     return this.formBuilder.group({
    //         id: [b.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
    //         number: [b.number || 0],
    //         reference: [b.reference],
    //         referenceDocDate: [b.referenceDocDate],
    //         header: [b.header],
    //         footer: [b.footer],
    //         dealer: [b.dealer || this.loginSrv.appCtx.id, Validators.required],
    //     });
    // }

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
                    this._detail?.loadDetailLines().subscribe();

                    this.shellSrv.setLoading(false);
                });
        }
    }

    protected importedDocuments(): Lookup[] {
        return [];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return false;
    }

}
