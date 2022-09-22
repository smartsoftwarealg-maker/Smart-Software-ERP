import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { JournalListComponent } from './journal-list.component';
import { LookupModule } from '@ss/common/api-lookup';
import { JournalDetailComponent } from './journal-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        LookupModule
    ],
    declarations: [JournalListComponent, JournalDetailComponent],
    exports: [JournalListComponent, JournalDetailComponent]
})
export class TreasuryUiJournalModule {}
