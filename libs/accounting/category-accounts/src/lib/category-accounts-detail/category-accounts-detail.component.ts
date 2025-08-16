import {Component, inject} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {SalesCategory} from "../category-accounts.api";
import {CategoryAccountsService} from "../category-accounts.service";
import {AccountAutocompleteModel, AccountService, AccountStringAutocompleteModel} from "@ss/accounting/api-accounts";
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from "@ss/common/ui-auto-complete";

@Component({
    selector: 'ss-category-account-detail',
    templateUrl: './category-accounts-detail.component.html',
    styleUrl: './category-accounts-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        UiAutoCompleteComponent,
    ],
})
export class CategoryAccountsDetailComponent extends BaseEntityDetailComponent<SalesCategory> {
    constructor(
        public categorySrv: CategoryAccountsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            categorySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ACC_CATEGORY_ACCOUNT',
        );
    }
    private accountSrv = inject(AccountService);
    //accountLookup = new AccountAutocompleteModel(this.accountSrv);
    accountLookup1 = new AccountStringAutocompleteModel(this.accountSrv);
    accountLookup2 = new AccountStringAutocompleteModel(this.accountSrv);

    public override setupForm(e: SalesCategory): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            cashAccount: [e.cashAccount],
            deferredAccount: [e.deferredAccount],
            cashDescription: [e.cashDescription],
            deferredDescription: [e.deferredDescription],
        });
    }
}
