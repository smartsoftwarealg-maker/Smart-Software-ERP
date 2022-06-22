import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckListComponent } from './check-list.component';
import { CheckDetailComponent } from './check-detail.component';
import { RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { AgentDenominationPipe } from '@ss/logistics/api-agent';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [CheckListComponent, CheckDetailComponent, AgentDenominationPipe],
    exports: [CheckListComponent, CheckDetailComponent]
})
export class TreasuryUiChecksModule { }
