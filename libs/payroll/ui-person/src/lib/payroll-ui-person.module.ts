import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {PersonListComponent} from './list/person-list.component';
import {PersonDetailComponent} from './detail/person-detail.component';
import {CommonUiImageInputModule} from '@ss/common/ui-image-input';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import { EmployeeActivationComponent } from './activation/employee-activation.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    exports: [PersonListComponent, PersonDetailComponent, EmployeeActivationComponent],
    declarations: [PersonListComponent, PersonDetailComponent, EmployeeActivationComponent]
})
export class PayrollUiPersonModule {
}
