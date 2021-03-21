import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { PersonListComponent } from './list/person-list.component';
import { PersonDetailComponent } from './detail/person-detail.component';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { EmployeeActivationComponent } from './activation/employee-activation.component';
import { EmployeeActivationHistoryComponent } from './activation/employee-activation-history.component';
import { Router, RouterModule } from '@angular/router';
import { EmployeeActivationFormComponent } from './activation/employee-activation-form.component';
import { EmployeeDeactivationFormComponent } from './activation/employee-deactivation-form.component';
import { EmployeeListComponent } from './activation/employee-list.component';
import { EmployeeActivationDetailComponent } from './activation/employee-activation-detail.component';

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
        PersonListComponent,
        PersonDetailComponent,
        EmployeeActivationComponent,
        EmployeeActivationHistoryComponent,
        EmployeeDeactivationFormComponent,
        EmployeeActivationFormComponent,
        EmployeeListComponent,
        EmployeeActivationDetailComponent
    ],
    declarations: [
        PersonListComponent,
        PersonDetailComponent,
        EmployeeActivationComponent,
        EmployeeActivationHistoryComponent,
        EmployeeDeactivationFormComponent,
        EmployeeActivationFormComponent,
        EmployeeListComponent,
        EmployeeActivationDetailComponent
    ]
})
export class PayrollUiPersonModule {
}
