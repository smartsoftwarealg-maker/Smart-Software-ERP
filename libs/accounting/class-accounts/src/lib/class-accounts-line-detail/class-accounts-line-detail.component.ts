import {
    UntypedFormGroup,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';
import { ClassAccountsLineService } from '../class-accounts.service';
import { SodismacSupplierAccount } from '../class-accounts-api.class';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import {AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';
import { SalesCategoryService } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-class-accounts-line-detail',
    templateUrl: './class-accounts-line-detail.component.html',
    styleUrls: ['./class-accounts-line-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe,
        UiAutoCompleteComponent,
    ],
})
export class ClassAccountsLineDetailComponent extends BaseChildEntityDetailComponent<SodismacSupplierAccount> {
    private fb = inject(FormBuilder);
    private accountSrv = inject(AccountService);
    private categorySrv = inject(SalesCategoryService);
    accountLookup = new AccountAutocompleteModel(this.accountSrv);
    categoryLookup = new DefaultAutoCompleteModel(this.categorySrv);

    constructor(protected override entitySrv: ClassAccountsLineService) {
        super(entitySrv, 'CLASS_ACCOUNTS');
    }

    public override setupForm(b: SodismacSupplierAccount): UntypedFormGroup {
        return this.fb.group({
            id: [b.id || 0],
            parentId: [b.parentId || this.entitySrv.getParentId()],
            categoryId: [b.categoryId, Validators.required],
            accountId: [b.accountId, Validators.required],
        });
    }
}
