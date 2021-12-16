import {
    LOOKUPS_URL
} from '../common';
import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService
} from '@ss/common/api-common';
import { Routes } from '@angular/router';
import { LIST_URL } from '@ss/common/api-common';
import {
    CategoryListComponent,
    CategoryDetailComponent,
    DiplomaListComponent,
    DiplomaDetailComponent,
    EducationLevelDetailComponent,
    EducationLevelListComponent,
    MaritalStatusDetailComponent,
    MaritalStatusListComponent,
    PostDetailComponent,
    PostListComponent,
    ServiceListComponent,
    ServiceDetailComponent
} from '@ss/common/ui-lookup';
import { WilayaListComponent, WilayaDetailComponent } from '@ss/common/ui-lookup';
import { NationalityDetailComponent, NationalityListComponent } from '@ss/common/ui-lookup';
import { EmployeeListComponent, EmployeeDetailComponent } from '@ss/payroll/ui-employee';
import { EmploymentTypeListComponent, EmploymentTypeDetailComponent } from 'libs/common/ui-lookup/src/lib/employment-type.component';
import { SuspensionReasonListComponent, SuspensionReasonDetailComponent } from 'libs/common/ui-lookup/src/lib/suspension-reason.component';
import { DepartmentListComponent, DepartmentDetailComponent } from 'libs/common/ui-lookup/src/lib/department.component';
import { DivisionListComponent, DivisionDetailComponent } from 'libs/common/ui-lookup/src/lib/division.component';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./payroll-lookups.module').then(m => m.PayrollLookupsModule)
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
