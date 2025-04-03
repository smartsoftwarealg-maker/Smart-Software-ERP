import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {
    Account,
    AccountService,
    AccountStringAutocompleteModel,
    EndowmentAccountService
} from '@ss/accounting/api-accounts';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DepreciationAccountService } from '@ss/accounting/api-accounts';

@Component({
    selector: 'ss-asset-accounts-detail',
    templateUrl: './asset-accounts-detail.component.html',
    styleUrls: ['./asset-accounts-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent]
})
export class AssetAccountsDetailComponent extends BaseEntityDetailComponent<Account> {
    #depreciationSrv = inject(DepreciationAccountService);
    #endowmentSrv = inject(EndowmentAccountService);

    depreciationAccountLookup = new DefaultAutoCompleteModel(this.#depreciationSrv, 'accountNo');
    endowmentAccountLookup = new DefaultAutoCompleteModel(this.#endowmentSrv, 'accountNo');

    constructor(
        public accountService: AccountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(accountService,
              shellSrv,
              snackBarSrv,
              route,
              formBuilder,
              confirmationSrv,
              'ACC_ASSET_ACCOUNTS');
    }

    public override setupForm(a: Account) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            accountNo: [a.accountNo],
            description: [a.description],
            creationDate: [a.creationDate],
            accType: [a.accType],
            analyzed: [a.analyzed],
            descriptionAr: [a.descriptionAr],
            balanceConstraint: [a.balanceConstraint],
            summaryLevel: [a.summaryLevel],
            customerCode: [a.customerCode],
            budgetAccount: [a.budgetAccount],
            treasuryAccount: [a.treasuryAccount],
            journalId: [a.journalId],
            ccRequired: [a.ccRequired],
            depreciationAccount: [a.depreciationAccount],
            endowmentAccount: [a.endowmentAccount],
            depreciationRate: [a.depreciationRate],
            usefulLife: [a.usefulLife]
        });
    }

}
