import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayrollUiPersonModule } from './payroll-ui-person.module';
import { EmployeeActivationComponent } from './activation/employee-activation.component'
import { ACTIVITY_HISTORY_URL, ACTIVATION_URL, DEACTIVATION_URL } from './constants';
import { EmployeeActivationHistoryComponent } from './activation/employee-activation-history.component';
import { EmployeeActivationFormComponent } from './activation/employee-activation-form.component';
import { LIST_URL, RedirectToParentComponent } from '@ss/common/api-common';
import { EmployeeDeactivationFormComponent } from './activation/employee-deactivation-form.component';
import { EmployeeListComponent } from './activation/employee-list.component';

@NgModule({
    imports: [
        PayrollUiPersonModule,
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
                        path: ACTIVITY_HISTORY_URL,
                        component: EmployeeActivationHistoryComponent
                    },
                    {
                        path: ACTIVATION_URL,
                        component: EmployeeActivationFormComponent
                    },
                    {
                        path: DEACTIVATION_URL,
                        component: EmployeeDeactivationFormComponent
                    },
                    { path: '**', redirectTo: ACTIVITY_HISTORY_URL }
                ]
            },
            { path: '**', redirectTo: '' }
        ])
    ],
    declarations: [
        RedirectToParentComponent
    ]
})
export class EmployeeActivationModule {

}