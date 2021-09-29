import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { EmployeeCareerOverviewComponent } from './empolyee-career-overview.component';
import { EmployeeCareerHistoryComponent } from './employee-career-history.component';

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
                component: EmployeeCareerOverviewComponent,
                children: [
                    {
                        path: '',
                        component: EmployeeCareerHistoryComponent
                    }
                ]
            },
            { path: '**', redirectTo: '' }
        ])
    ],
    declarations: [
        EmployeeListComponent,
        EmployeeCareerOverviewComponent,
        EmployeeCareerHistoryComponent
    ]
})
export class PayrollUiEmployeeCareerModule { }
