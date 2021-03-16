import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayrollUiPersonModule } from './payroll-ui-person.module';
import { EmployeeActivationComponent } from './activation/employee-activation.component'
import { ACTIVATION_HISTORY_URL, ACTIVATION_URL } from './constants';
import { EmployeeActivationHistoryComponent } from './activation/employee-activation-history.component';
import { EmployeeActivationFormComponent } from './activation/employee-activation-form.component';
import { LIST_URL, RedirectToParentComponent } from '@ss/common/api-common';

@NgModule({
    imports: [
        PayrollUiPersonModule,
        RouterModule.forChild([
            { path: '', component: RedirectToParentComponent},
            {
                path: ':id',
                component: EmployeeActivationComponent,
                children: [
                    {
                        path: ACTIVATION_HISTORY_URL,
                        component: EmployeeActivationHistoryComponent
                    },
                    {
                        path: ACTIVATION_URL,
                        component: EmployeeActivationFormComponent
                    },
                    { path: '**', redirectTo: ACTIVATION_HISTORY_URL }
                ]
            },
            { path: '**', redirectTo: ''}
        ])
    ],
    declarations: [
        RedirectToParentComponent
    ]
})
export class EmployeeActivationModule {

}