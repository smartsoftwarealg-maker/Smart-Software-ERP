import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {
    AccountService, AccountStringAutocompleteModel,
    GenerationAccount,
    GenerationAccountService
} from '@ss/accounting/api-accounts';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-generation-accounts-detail',
    templateUrl: './generation-accounts-detail.component.html',
    styleUrls: ['./generation-accounts-detail.component.scss']
})
export class GenerationAccountsDetailComponent extends BaseEntityDetailComponent<GenerationAccount> {
    private accountSrv = inject(AccountService);
    purchaseLookup    = new AccountStringAutocompleteModel(this.accountSrv);
    supplierLookup    = new AccountStringAutocompleteModel(this.accountSrv);
    stockLookup       = new AccountStringAutocompleteModel(this.accountSrv);
    consumptionLookup = new AccountStringAutocompleteModel(this.accountSrv);
    salesLookup       = new AccountStringAutocompleteModel(this.accountSrv);

    constructor(
        public override entitySrv: GenerationAccountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ACC_STOCK_ACCOUNTS');
    }


    public override setupForm(b: GenerationAccount) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            account: [b.account],
            stock: [b.stock],
            consumption: [b.consumption],
            purchase: [b.purchase],
            supplier: [b.supplier],
            sales: [b.sales],
            description: [b.description, Validators.required],
        });
    }

    override readForm(): GenerationAccount {
        console.log('value', this.form.getRawValue());
        return this.form.getRawValue();
    }

}
