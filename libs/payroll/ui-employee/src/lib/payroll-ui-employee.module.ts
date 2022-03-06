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
import { EmployeeActivationListComponent } from './employee-activation/employee-activation-list.component';
import { EmployeeActivationDetailComponent } from './employee-activation/employee-activation-detail.component';
import { EmployeeCareerDetailComponent } from './employee-career/employee-career-detail.component';
import { EmployeeCareerListComponent } from './employee-career/employee-career-list.component';
import { EmployeeContractListComponent } from './employee-contracts/employee-contracts-list.component';
import { EmployeeContractsDetailComponent } from './employee-contracts/employee-contracts-detail.component';
import { EmployeeWifeDetailComponent } from './employee-wives/employee-wife-detail.component';
import { EmployeeWivesListComponent } from './employee-wives/employee-wives-list.component';
import { EmployeeDiplomaListComponent } from './employee-diplomas/employee-diploma-list/employee-diploma-list.component';
import { EmployeeDiplomaDetailComponent } from './employee-diplomas/employee-diploma-detail/employee-diploma-detail.component';
import { EmployeeTrainingListComponent } from './employee-trainings/employee-training-list/employee-training-list.component';
import { EmployeeTrainingDetailComponent } from './employee-trainings/employee-training-detail/employee-training-detail.component';

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
        EmployeeDetailComponent,
        EmployeeActivationDetailComponent,
        EmployeeContractsDetailComponent,
        EmployeeWifeDetailComponent
    ],
    declarations: [
        EmployeeListComponent,
        EmployeeDetailComponent,
        EmployeeActivationListComponent,
        EmployeeActivationDetailComponent,
        EmployeeCareerListComponent,
        EmployeeCareerDetailComponent,
        EmployeeContractListComponent,
        EmployeeContractsDetailComponent,
        EmployeeWivesListComponent,
        EmployeeWifeDetailComponent,
        EmployeeDiplomaListComponent,
        EmployeeDiplomaDetailComponent,
        EmployeeTrainingListComponent,
        EmployeeTrainingDetailComponent
    ]
})
export class PayrollUiEmployeeModule {
}
