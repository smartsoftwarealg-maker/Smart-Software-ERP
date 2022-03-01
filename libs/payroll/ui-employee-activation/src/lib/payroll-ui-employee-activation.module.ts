import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ACTIVITY_HISTORY_ROUTE_URL, ACTIVATION_ROUTE_URL, DEACTIVATION_ROUTE_URL } from '@ss/payroll/api-employee';
import { RedirectToParentComponent, CanActivateService, CanDeactivateService, MaterialModule } from '@ss/common/api-common';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeDeactivationFormComponent } from './employee-deactivation-form.component';
import { EmployeeActivationDetailComponent } from './employee-activation-detail.component';
import { EmployeeActivationFormComponent } from './employee-activation-form.component';
import { EmployeeActivationComponent } from './employee-activation.component';
import { EmployeeActivationHistoryComponent } from './employee-activation-history.component';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

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
        RouterModule.forChild([
            {
                path: '',
                component: EmployeeListComponent
            },
            {
                path: ':id',
                component: EmployeeActivationComponent,
                children: [
                    {
                        path: ACTIVITY_HISTORY_ROUTE_URL,
                        component: EmployeeActivationHistoryComponent
                    },
                    {
                        path: ACTIVATION_ROUTE_URL,
                        component: EmployeeActivationFormComponent,
                        canActivate: [CanActivateService],
                        canDeactivate: [CanDeactivateService]
                    },
                    {
                        path: DEACTIVATION_ROUTE_URL,
                        component: EmployeeDeactivationFormComponent,
                        canActivate: [CanActivateService],
                        canDeactivate: [CanDeactivateService]
                    },
                    {
                        path: ':id',
                        component: EmployeeActivationDetailComponent,
                        canActivate: [CanActivateService],
                        canDeactivate: [CanDeactivateService]
                    },
                    { path: '**', redirectTo: ACTIVITY_HISTORY_ROUTE_URL }
                ]
            },
            { path: '**', redirectTo: '' }
        ])
    ],
    declarations: [
        RedirectToParentComponent,
        EmployeeActivationComponent,
        EmployeeActivationHistoryComponent,
        EmployeeDeactivationFormComponent,
        EmployeeActivationFormComponent,
        EmployeeListComponent,
        EmployeeActivationDetailComponent
    ]
})
export class PayrollUiEmployeeActivationModule { }
