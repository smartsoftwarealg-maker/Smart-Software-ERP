import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import { loginGuard } from '../erp-guards';
import { DriverDetailComponent, DriverLicenseDetailComponent, DriverLicenseListComponent } from "@ss/park/driver";
import { PARK_DRIVER_URL } from '../common';
import { EmployeeListComponent } from '@ss/payroll/ui-employee';
import { AppArchiveDetailComponent, AppArchiveListComponent } from '@ss/common/app-archive';
import { DriverListComponent } from "../../../../../libs/park/driver/src/lib/driver-list/driver-list.component";

export const parkRoutes: Routes = [
    {
        path: PARK_DRIVER_URL,
        children: [
            {
                path: LIST_URL,
                component: DriverListComponent,
                canActivate: [loginGuard],
                data: { active: false }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: DriverDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full' },
                                    {path: ':id', component: AppArchiveDetailComponent},
                                ]
                            },
                            {
                                path: 'licenses',
                                children: [
                                    { path: '',    component: DriverLicenseListComponent, pathMatch: 'full' },
                                    { path: ':id', component: DriverLicenseDetailComponent }
                                ]
                            }
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

