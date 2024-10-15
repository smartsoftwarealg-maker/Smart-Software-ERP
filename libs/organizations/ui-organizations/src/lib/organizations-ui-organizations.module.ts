import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrgChartModule } from 'angular13-organization-chart';
import { OrganizationsDetailComponent } from './organizations/organizations-detail.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';

import { DivisionsListComponent } from './divisions/divisions-list.component';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { DivisionDetailComponent } from './divisions/division-detail.component';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { DepartmentDetailComponent } from './departments/department-detail.component';
import { DepartmentsListComponent } from './departments/departments-list.component';
import { ServiceDetailComponent } from './services/service-detail.component';
import { ServicesListComponent } from './services/services-list.component';
import { OfficeDetailComponent } from './offices/detail/office-detail.component';
import { OfficesListComponent } from './offices/list/offices-list.component';
import { ImageInputComponent } from '@ss/common/ui-image-input';

@NgModule({
    declarations: [
        OrganizationsComponent,
        OrganizationsDetailComponent,
        DivisionsListComponent,
        DivisionDetailComponent,
        DepartmentDetailComponent,
        DepartmentsListComponent,
        ServiceDetailComponent,
        ServicesListComponent,
        OfficeDetailComponent,
        OfficesListComponent
    ],
    imports: [
        CommonModule,
        CommonUiLangModule,
        OrgChartModule,
        MaterialModule,

        CommonUiAutoCompleteModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        RouterModule,
        ImageInputComponent
    ],
    exports: [
        OrganizationsComponent,
        DivisionsListComponent,
        DivisionDetailComponent,
        DepartmentDetailComponent,
        DepartmentsListComponent,
        ServiceDetailComponent,
        ServicesListComponent,
        OfficeDetailComponent,
        OfficesListComponent
    ]
})
export class CommonUiOrganizationsModule { }
