import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrgChartModule } from 'angular13-organization-chart';
import { OrganizationsDetailComponent } from './organizations/organizations-detail.component';

import { MaterialModule } from '@ss/common/api-common';

import { DivisionsListComponent } from './divisions/divisions-list.component';

import { DivisionDetailComponent } from './divisions/division-detail.component';

import { RouterModule } from '@angular/router';

import { DepartmentDetailComponent } from './departments/department-detail.component';
import { DepartmentsListComponent } from './departments/departments-list.component';
import { ServiceDetailComponent } from './services/service-detail.component';
import { ServicesListComponent } from './services/services-list.component';
import { OfficeDetailComponent } from './offices/detail/office-detail.component';
import { OfficesListComponent } from './offices/list/offices-list.component';
import { ImageInputComponent } from '@ss/common/ui-image-input';

@NgModule({
    imports: [
        CommonModule,

        OrgChartModule,
        MaterialModule,




        RouterModule,
        ImageInputComponent,
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
