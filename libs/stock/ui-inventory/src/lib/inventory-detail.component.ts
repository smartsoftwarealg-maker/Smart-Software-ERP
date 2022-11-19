import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryService} from '@ss/stock/api-inventory';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Transaction} from '@ss/logistics/api-transaction';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';

@Component({
    selector: 'ss-inventory-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-detail.component.html'
})
export class InventoryDetailComponent extends BaseEntityDetailComponent<Transaction> {

    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)

    constructor(
        private langSrv: LanguageService,
        private loginSrv: LoginService,
        public inventoryService: InventoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public lookupsSrv: LookupsService) {
        super(inventoryService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_INVENTORY');
    }


    public setupForm(b: Transaction) {
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

}
