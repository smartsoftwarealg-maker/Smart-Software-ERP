import {Component, inject} from '@angular/core';
import {Vat, VatService} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

import { MaterialModule } from '@ss/common/api-common';



import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {AccountService, AccountStringAutocompleteModel} from "@ss/accounting/api-accounts";
import {UiAutoCompleteComponent} from "@ss/common/ui-auto-complete";


@Component({
    selector: 'ss-vat-detail',
    templateUrl: './vat-detail.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        UiAutoCompleteComponent
    ],
    styleUrls: ['./vat-detail.component.scss']
})
export class VatDetailComponent extends BaseEntityDetailComponent<Vat> {
    #accountSrv = inject(AccountService);
    purchaseLookup    = new AccountStringAutocompleteModel(this.#accountSrv);
    salesLookup    = new AccountStringAutocompleteModel(this.#accountSrv);

    constructor(
        public vatSrv: VatService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(vatSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_VAT');
    }

    public override setupForm(e: Vat): UntypedFormGroup {
        return this.formBuilder.group({
            id:              [e.id],
            value:           [e.value, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
            description:     [e.description],
            descriptionAr:   [e.descriptionAr],
            salesAccount:    [e.salesAccount, [Validators.minLength(3), Validators.maxLength(10)]],
            purchaseAccount: [e.purchaseAccount]
        });
    }

}
