import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {TransacAccount, TransacAccountService} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AccountService, AccountStringAutocompleteModel} from '@ss/accounting/api-accounts';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-transac-accounts-detail',
    templateUrl: './transac-accounts-detail.component.html',
    styleUrls: ['./transac-accounts-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent]
})
export class TransacAccountsDetailComponent extends BaseEntityDetailComponent<TransacAccount> {
    private accountSrv = inject(AccountService);
    purchaseLookup    = new AccountStringAutocompleteModel(this.accountSrv);

    constructor(
        public override entitySrv: TransacAccountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ACC_TRANSAC_ACCOUNTS');
    }


    public override setupForm(b: TransacAccount) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:          [b.id],
            accountno:   [b.accountno, [Validators.maxLength(12), Validators.required]],
            description: [b.description, Validators.required],
        });
    }

}
