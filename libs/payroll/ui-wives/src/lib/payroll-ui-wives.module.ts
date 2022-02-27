import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeWivesListComponent } from './employee-wives-list.component';
import { EmployeeWivesOverviewComponent } from './empolyee-wives-overview.component';
import { EmployeeWivesDetailComponent } from './employee-wives-detail.component';

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
                component: EmployeeWivesOverviewComponent,
                children: [
                    {
                        path: '',
                        component: EmployeeWivesListComponent
                    },
                    {
                        path: ':id',
                        component: EmployeeWivesDetailComponent
                    }
                ]
            },
            { path: '**', redirectTo: '' }
        ])
    ],
    declarations: [
        EmployeeListComponent,
        EmployeeWivesOverviewComponent,
        EmployeeWivesListComponent,
        EmployeeWivesDetailComponent
    ],
    exports: [
    ]
})
export class PayrollUiWivesModule {
}
