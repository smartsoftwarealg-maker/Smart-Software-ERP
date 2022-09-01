import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {TransacAccount, TransacAccountService} from '@ss/accounting/accounting-api';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';

@Component({
  selector: 'ss-transac-accounts-detail',
  templateUrl: './transac-accounts-detail.component.html',
  styleUrls: ['./transac-accounts-detail.component.scss']
})
export class TransacAccountsDetailComponent extends BaseEntityDetailComponent<TransacAccount> {

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


    public setupForm(b: TransacAccount) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:          [b.id],
            accountno:   [b.accountno, [Validators.maxLength(12), Validators.required]],
            description: [b.description, Validators.required],
        });
    }

}
