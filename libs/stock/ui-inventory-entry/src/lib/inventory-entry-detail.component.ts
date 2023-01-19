import {Component, ViewChild} from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryEntryService} from '@ss/stock/api-inventory-entry';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';
import {Transaction} from '@ss/logistics/api-transaction';
import {MatDialog} from '@angular/material/dialog';
import {InventoryService} from '@ss/stock/api-inventory';
import {InventoryLinesListComponent} from '@ss/stock/ui-inventory-lines';
import {InventoryImportComponent} from '@ss/logistics/ui-doc-import';


@Component({
    selector: 'ss-inventory-entry-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-entry-detail.component.html'
})
export class InventoryEntryDetailComponent extends BaseEntityDetailComponent<Transaction> {
    @ViewChild(InventoryLinesListComponent) detail: InventoryLinesListComponent;
    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    }


    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)

    constructor(
        private langSrv: LanguageService,
        private loginSrv: LoginService,
        private dialog: MatDialog,
        public inventoryService: InventoryEntryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public lookupsSrv: LookupsService) {
        super(inventoryService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_INVENTORY_ENTRY');
    }

    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importBtn);
    }

    public override setupForm(b: Transaction) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            centerId: [0 || this.loginSrv.appCtx.center],
            date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            dealer: [b.dealer || this.loginSrv.appCtx.id, Validators.required],
        });
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
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
