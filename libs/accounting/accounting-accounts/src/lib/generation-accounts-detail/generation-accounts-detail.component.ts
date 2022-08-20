import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {GenerationAccount, GenerationAccountService} from '@ss/accounting/api-accounts';
import {Bank, BankService} from '@ss/administration/api-bank';
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


    public setupForm(b: GenerationAccount) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            stock: [b.stock],
            consumption: [b.consumption],
            purchase: [b.purchase],
            supplier: [b.supplier],
            sales: [b.sales],
            description: [b.description, Validators.required],
        });
    }

}
