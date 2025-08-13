import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {
    AccountService, AccountStringAutocompleteModel,
    GenerationAccount,
    GenerationAccountService
} from '@ss/accounting/api-accounts';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-generation-accounts-detail',
    templateUrl: './generation-accounts-detail.component.html',
    styleUrls: ['./generation-accounts-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent]
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
            'ACC_GENERATION_ACCOUNTS');
    }


    public override setupForm(b: GenerationAccount) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:          [b.id],
            account:     [b.account],
            stock:       [b.stock],
            consumption: [b.consumption],
            purchase:    [b.purchase],
            supplier:    [b.supplier],
            sales:       [b.sales],
            description: [b.description, Validators.required],
        });
    }
}
