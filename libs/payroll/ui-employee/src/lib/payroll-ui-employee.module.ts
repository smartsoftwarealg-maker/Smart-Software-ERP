import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { EmployeeActivationListComponent } from './employee-activation/list/employee-activation-list.component';
import { EmployeeActivationDetailComponent } from './employee-activation/detail/employee-activation-detail.component';
import { EmployeeCareerDetailComponent } from './employee-career/detail/employee-career-detail.component';
import { EmployeeCareerListComponent } from './employee-career/list/employee-career-list.component';
import { EmployeeContractListComponent } from './employee-contracts/list/employee-contracts-list.component';
import { EmployeeContractsDetailComponent } from './employee-contracts/detail/employee-contracts-detail.component';
import { EmployeeWifeDetailComponent } from './employee-wives/detail/employee-wife-detail.component';
import { EmployeeWivesListComponent } from './employee-wives/list/employee-wives-list.component';
import { EmployeeDiplomaListComponent } from './employee-diplomas/employee-diploma-list/employee-diploma-list.component';
import { EmployeeDiplomaDetailComponent } from './employee-diplomas/employee-diploma-detail/employee-diploma-detail.component';
import { EmployeeTrainingListComponent } from './employee-trainings/employee-training-list/employee-training-list.component';
import { EmployeeTrainingDetailComponent } from './employee-trainings/employee-training-detail/employee-training-detail.component';
import { PunishmentListComponent } from './employee-punishments/punishment-list/punishment-list.component';
import { PunishmentDetailComponent } from './employee-punishments/punishment-detail/punishment-detail.component';
import { EmployeeChildrenListComponent } from './employee-children/list/employee-children-list.component';
import { EmployeeChildDetailComponent } from './employee-children/detail/employee-child-detail.component';
import { EmployeeLanguagesDetailComponent } from './employee-languages/detail/employee-languages-detail.component';
import { EmployeeLanguagesListComponent } from './employee-languages/list/employee-languages-list.component';
import { EmployeeOldCareerListComponent } from './employee-old-career/list/employee-old-career-list.component';
import { EmployeeOldCareerDetailComponent } from './employee-old-career/detail/employee-old-career-detail.component';
import { EmployeeDecisionDetailComponent } from './employee-decisions/detail/employee-decision-detail.component';
import { EmployeeDecisionListComponent } from './employee-decisions/list/employee-decision-list.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import {CustomAttributesModule} from '@ss/custom-attributes';
import {AppArchiveModule} from '@ss/common/app-archive';
import { ImageInputComponent } from '@ss/common/ui-image-input';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,

        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        ImageInputComponent
    ],
    exports: [
        EmployeeListComponent,
        EmployeeDetailComponent,
        EmployeeActivationDetailComponent,
        EmployeeContractsDetailComponent,
        EmployeeWifeDetailComponent,
        EmployeeChildDetailComponent,
        EmployeeLanguagesDetailComponent,
        EmployeeOldCareerDetailComponent,
        EmployeeDecisionDetailComponent,
        PersonListComponent,
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
        EmployeeTrainingDetailComponent,
        PunishmentListComponent,
        PunishmentDetailComponent,
        EmployeeChildrenListComponent,
        EmployeeChildDetailComponent,
        EmployeeLanguagesDetailComponent,
        EmployeeLanguagesListComponent,
        EmployeeOldCareerListComponent,
        EmployeeOldCareerDetailComponent,
        EmployeeDecisionDetailComponent,
        EmployeeDecisionListComponent,
        PersonListComponent,
        PaymentInfoComponent,
    ],
})
export class PayrollUiEmployeeModule {}
