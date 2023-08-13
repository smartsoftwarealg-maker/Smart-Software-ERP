import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import { loginGuard, payrollGuard } from "../erp-guards";
import {
    DriverDetailComponent,
    DriverLicenseDetailComponent,
    DriverLicenseListComponent,
    DriverListComponent, DriverVehiclesDetailComponent,
    DriverVehiclesListComponent
} from '@ss/park/driver';
import { PARK_DRIVER_URL, PARK_VEHICLE_TYPES_URL, PARK_VEHICLE_URL, PAY_SPECIAL_PAYROLL_URL } from "../common";
import { AppArchiveDetailComponent, AppArchiveListComponent } from '@ss/common/app-archive';
import { VehicleDetailComponent, VehicleListComponent } from '@ss/park/vehicles';
import { SpecialPayrollDetailComponent, SpecialPayrollListComponent } from "@ss/remuneration/special-payroll";
import {
    VehicleTypeDetailComponent,
    VehicleTypeListComponent
} from "../../../../../libs/common/ui-lookup/src/lib/components/vehicle-type.component";

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
                            },
                            {
                                path: 'vehicles',
                                children: [
                                    { path: '',    component: DriverVehiclesListComponent, pathMatch: 'full' },
                                    { path: ':id', component: DriverVehiclesDetailComponent }
                                ]
                            }
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    {
        path: PARK_VEHICLE_URL,
        children: [
            {
                path: LIST_URL,
                component: VehicleListComponent,
                canActivate: [loginGuard],
                data: { active: false }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: VehicleDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        children: [
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    {
        path: PARK_VEHICLE_TYPES_URL,
        children: [
            {
                path: LIST_URL,
                component: VehicleTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: VehicleTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

