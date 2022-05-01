import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetAccountsListComponent } from './asset-accounts-list/asset-accounts-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import { AssetAccountsDetailComponent } from './asset-accounts-detail/asset-accounts-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule
    ],
    declarations: [
      AssetAccountsListComponent,
      AssetAccountsDetailComponent
    ],
})
export class AccountingAccountsModule {}
