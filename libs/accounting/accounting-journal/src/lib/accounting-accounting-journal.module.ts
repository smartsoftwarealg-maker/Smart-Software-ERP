import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,
        CommonUiAutoCompleteModule,

        JournalListComponent,
        JournalDetailComponent
    ],
})
export class AccountingAccountingJournalModule {}
