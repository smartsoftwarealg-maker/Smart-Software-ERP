import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
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


@Component({
    selector: 'ss-inventory-entry-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-entry-detail.component.html'
})
export class InventoryEntryDetailComponent extends BaseEntityDetailComponent<Transaction> {
    manager = false;
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)

    constructor(
        private langSrv: LanguageService,
        private loginSrv: LoginService,
        public inventoryEntryService: InventoryEntryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public lookupsSrv: LookupsService) {
        super(inventoryEntryService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_INVENTORY_ENTRY');
    }


    public setupForm(b: Transaction) {
        // Make sure to update the template if you edit the configuration here
        this.manager = this.loginSrv.appCtx.manager;
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            centerId: [0],
            date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this.manager}, Validators.required]
        });
    }

}
