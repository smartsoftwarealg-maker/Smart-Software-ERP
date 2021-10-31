import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {CCGroup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryExitService} from '@ss/stock/api-inventory-exit';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';
import {Transaction} from '@ss/logistics/api-transaction';


@Component({
    selector: 'ss-inventory-exit-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-exit-detail.component.html'
})
export class InventoryExitDetailComponent extends BaseEntityDetailComponent<Transaction> {

    public groups: CCGroup[];
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)

    constructor(
        private langSrv: LanguageService,
        private loginSrv: LoginService,
        public inventoryExitService: InventoryExitService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public lookupsSrv: LookupsService) {
        super(inventoryExitService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_INVENTORY_EXIT');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(b: Transaction) {
        // Make sure to update the template if you edit the configuration here
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
            dealer: [b.dealer || this.loginSrv.appCtx.id, Validators.required]
        });
    }

}
