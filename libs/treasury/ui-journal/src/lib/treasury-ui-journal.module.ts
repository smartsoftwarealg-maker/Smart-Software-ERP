import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { MaterialModule } from '@ss/common/api-common';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,



        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        JournalListComponent, JournalDetailComponent
    ],
    exports: [JournalListComponent, JournalDetailComponent]
})
export class TreasuryUiJournalModule {}
