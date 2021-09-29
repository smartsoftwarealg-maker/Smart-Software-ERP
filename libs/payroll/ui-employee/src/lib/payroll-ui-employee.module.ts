import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { EmployeeListComponent } from './list/employee-list.component';
import { EmployeeDetailComponent } from './detail/employee-detail.component';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule
    ],
    exports: [
        EmployeeListComponent,
        EmployeeDetailComponent
    ],
    declarations: [
        EmployeeListComponent,
        EmployeeDetailComponent
    ]
})
export class PayrollUiEmployeeModule {
}
