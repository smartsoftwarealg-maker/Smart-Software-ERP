import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { BankDescriptionPipe } from '@ss/administration/api-bank';
import { CheckBookDetailComponent } from './check-book-detail/check-book-detail.component';
import { CheckBookListComponent } from './check-book-list/check-book-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [BankDescriptionPipe, CheckBookDetailComponent, CheckBookListComponent],
    exports: [CheckBookDetailComponent, CheckBookListComponent]
})
export class TreasuryUiCheckBooksModule {}
