import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import { loginGuard } from '../erp-guards';
import {
    DriverDetailComponent,
    DriverLicenseDetailComponent,
    DriverLicenseListComponent,
    DriverListComponent, DriverVehiclesDetailComponent,
    DriverVehiclesListComponent
} from '@ss/park/driver';
import {
    PARK_DRIVER_URL,
    PARK_FUEL_TYPES_URL,
    PARK_INSURANCE_AGENCIES_URL, PARK_INSURANCE_POLICIES_URL,
    PARK_VEHICLE_TYPES_URL,
    PARK_VEHICLE_URL
} from '../common';
import { AppArchiveDetailComponent, AppArchiveListComponent } from '@ss/common/app-archive';
import {
    VehicleDamageDetailComponent,
    VehicleDamageListComponent,
    VehicleDetailComponent,
    VehicleFuelConsumptionDetailComponent,
    VehicleFuelConsumptionListComponent, VehicleInsuranceDetailComponent,
    VehicleInsuranceListComponent,
    VehicleListComponent,
    VehicleMaintenanceDetailComponent,
    VehicleMaintenanceListComponent,
    VehicleOilChangeDetailComponent,
    VehicleOilChangeListComponent
} from "@ss/park/vehicles";
import {
    FuelTypeDetailComponent,
    FuelTypeListComponent, InsurancePolicyDetailComponent, InsurancePolicyListComponent,
    VehicleTypeDetailComponent,
    VehicleTypeListComponent
} from '@ss/common/ui-lookup';
import {
    InsuranceAgencyDetailComponent,
    InsuranceAgencyListComponent
} from '@ss/common/ui-lookup';
import {
    VehicleDriverListComponent
} from "../../../../../libs/park/vehicles/src/lib/vehicle-driver-list/vehicles-driver-list.component";
import {
    VehiclesDriverDetailComponent
} from "../../../../../libs/park/vehicles/src/lib/vehicle-driver-detail/vehicles-driver-detail.component";

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
                            {
                                path: 'archive',
                                children: [
                                    { path: '', component: AppArchiveListComponent, pathMatch: 'full' },
                                    { path: ':id', component: AppArchiveDetailComponent },
                                ]
                            },
                            {
                                path: 'maintenance',
                                children: [
                                    { path: '', component: VehicleMaintenanceListComponent, pathMatch: 'full' },
                                    { path: ':id', component: VehicleMaintenanceDetailComponent },
                                ]
                            },
                            {
                                path: 'fuel',
                                children: [
                                    { path: '', component: VehicleFuelConsumptionListComponent, pathMatch: 'full' },
                                    { path: ':id', component: VehicleFuelConsumptionDetailComponent },
                                ]
                            },
                            {
                                path: 'oil',
                                children: [
                                    { path: '', component: VehicleOilChangeListComponent, pathMatch: 'full' },
                                    { path: ':id', component: VehicleOilChangeDetailComponent },
                                ]
                            },
                            {
                                path: 'insurance',
                                children: [
                                    { path: '', component: VehicleInsuranceListComponent, pathMatch: 'full' },
                                    { path: ':id', component: VehicleInsuranceDetailComponent },
                                ]
                            },
                            {
                                path: 'damages',
                                children: [
                                    { path: '', component: VehicleDamageListComponent, pathMatch: 'full' },
                                    { path: ':id', component: VehicleDamageDetailComponent },
                                ]
                            },
                            {
                                path: 'drivers',
                                children: [
                                    { path: '', component: VehicleDriverListComponent, pathMatch: 'full' },
                                    { path: ':id', component: VehiclesDriverDetailComponent },
                                ]
                            },
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    {
        path: PARK_INSURANCE_POLICIES_URL,
        children: [
            {
                path: LIST_URL,
                component: InsurancePolicyListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: InsurancePolicyDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PARK_INSURANCE_AGENCIES_URL,
        children: [
            {
                path: LIST_URL,
                component: InsuranceAgencyListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: InsuranceAgencyDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
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
    {
        path: PARK_FUEL_TYPES_URL,
        children: [
            {
                path: LIST_URL,
                component: FuelTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FuelTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
