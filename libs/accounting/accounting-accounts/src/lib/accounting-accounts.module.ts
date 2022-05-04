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
import { TransacAccountsDetailComponent } from './transac-accounts-detail/transac-accounts-detail.component';
import { TransacAccountsListComponent } from './transac-accounts-list/transac-accounts-list.component';
import { GenerationAccountsListComponent } from './generation-accounts-list/generation-accounts-list.component';
import { GenerationAccountsDetailComponent } from './generation-accounts-detail/generation-accounts-detail.component';

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
      AssetAccountsDetailComponent,
      TransacAccountsDetailComponent,
      TransacAccountsListComponent,
      GenerationAccountsListComponent,
      GenerationAccountsDetailComponent
    ],
})
export class AccountingAccountsModule {}
