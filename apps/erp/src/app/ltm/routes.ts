import { Routes } from '@angular/router';

import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {
    LTM_MATTER_URL,
    LTM_PERIODICITY_URL,
    LTM_CHARTS_URL,
    LTM_TEST_URL,
    LTM_CHEMICAL_TEST_URL,
    DASHBOARD_URL,
    COMMON_REPORTS_URL,
    LTM_LINES_URL,
    LTM_UNIT_URL,
    LTM_TEST_TYPE_URL,
    LTM_MIXTURE_URL,
    LTM_ANOMALIES_URL,
    LTM_TESTING_ANOMALIES_URL,
    LTM_PHYSICAL_TEST_URL,
    LTM_SILOS_URL,
    LTM_ALERT_URL,
    LTM_EQUIPMENT_URL,
    LTM_PRODUCTS_URL,
    LTM_PICKUP_POINTS_URL,
    LTM_NORM_URL,
    LTM_BLEACHER_URL,
    LTM_ZONE_URL,
    LTM_DEPOSIT_URL,
    LTM_SUPPLIER_URL, LTM_DEPOSIT_TEST_URL, LTM_RAW_MATERIAL_TEST_URL
} from '../common';

import {
    LtmMatterDetailComponent,
    LtmMatterListComponent,
    LtmMatterTestListComponent,
    LtmPeriodicitiesDetailComponent,
    LtmPeriodicitiesListComponent,
    LtmMatterTestDetailComponent,
    LtmTestingListComponent,
    LtmReportComponent,
    LtmBatchInputComponent,
    LineMatterDetailComponent,
    LineMatterListComponent,
    LtmTestListComponent,
    LtmTestTypeListComponent,
    LtmTestTypeDetailComponent,
    LtmTestDetailComponent,
    LTMMixtureListComponent,
    LtmMixtureDetailComponent,
    LtmMixtureDetailListComponent,
    LtmMixtureDetailDetailComponent,
    LtmAnomalyListComponent,
    LtmAnomalyDetailComponent,
    LtmTestingAnomalyListComponent,
    LtmTestingAnomalyDetailComponent,
    LtmSiloDetailComponent,
    LtmSiloListComponent,
    LtmAlertsComponent,
    LtmEquipmentListComponent,
    LtmEquipmentDetailComponent,
    LtmPickupPointListComponent,
    LtmPickupPointDetailComponent,
    LtmNormListComponent,
    LtmNormDetailComponent,
    LtmProductDetailComponent,
    LtmProductListComponent,
    LtmBleacherListComponent,
    LtmBleacherDetailComponent,
    LtmZoneListComponent,
    LtmZoneDetailComponent,
    LtmDepositDetailComponent,
    LtmDepositListComponent,
    CHEMICAL_TEST,
    PHYSICAL_TEST,
    DEPOSIT_TEST,
    RAW_MATERIAL_TEST,
    LtmPhysicalTestingListComponent, LtmDepositTestingListComponent, LtmRmTestingListComponent
} from '@ss/ltm/ltm';
import {loginGuard} from '../erp-guards';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import { UnitDetailComponent, UnitListComponent } from '@ss/common/ui-lookup';
import {
    LtmSupplierListComponent
} from '@ss/ltm/ltm';
import { LtmSupplierDetailComponent } from '@ss/ltm/ltm';
import {
    LtmMixturePickupPointsListComponent
} from '../../../../../libs/ltm/ltm/src/lib/ltm-mixture-pickup-points-list/ltm-mixture-pickup-points-list.component';
import {
    LtmMixturePickupPointsDetailComponent
} from '../../../../../libs/ltm/ltm/src/lib/ltm-mixture-pickup-points-detail/ltm-mixture-pickup-points-detail.component';

export const ltmRoutes: Routes = [
    {
        path: LTM_ALERT_URL, component: LtmAlertsComponent, canActivate: [loginGuard]
    },
    {
        path: LTM_CHARTS_URL, component: LtmReportComponent, canActivate: [loginGuard]
    },
    {
        path: LTM_LINES_URL,
        children: [
            { path: LIST_URL, component: LineMatterListComponent, canActivate: [loginGuard]},
            { path: ':id',
                component: LineMatterDetailComponent,
                canActivate: [loginGuard],
                children: [
                    { path: '', component: LtmMatterTestListComponent, pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: ':id', component: LtmMatterTestDetailComponent }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: LTM_SILOS_URL,
        children: [
            { path: LIST_URL, component: LtmSiloListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmSiloDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_NORM_URL,
        children: [
            { path: LIST_URL, component: LtmNormListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmNormDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_ANOMALIES_URL,
        children: [
            { path: LIST_URL, component: LtmAnomalyListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmAnomalyDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_EQUIPMENT_URL,
        children: [
            { path: LIST_URL, component: LtmEquipmentListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmEquipmentDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_PRODUCTS_URL,
        children: [
            { path: LIST_URL, component: LtmProductListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmProductDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_PICKUP_POINTS_URL,
        children: [
            { path: LIST_URL, component: LtmPickupPointListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmPickupPointDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_TESTING_ANOMALIES_URL,
        children: [
            { path: LIST_URL, component: LtmTestingAnomalyListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmTestingAnomalyDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_MATTER_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmMatterListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmMatterDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: LTM_MIXTURE_URL,
        children: [
            {
                path: LIST_URL,
                component: LTMMixtureListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmMixtureDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: 'm-matters',
                        children: [
                            { path: '', component: LtmMixtureDetailListComponent, pathMatch: 'full'},
                            { path: ':id', component: LtmMixtureDetailDetailComponent }
                        ]
                    },
                    { path: 'm-pickups',
                        children: [
                            { path: '', component: LtmMixturePickupPointsListComponent, pathMatch: 'full'},
                            { path: ':id', component: LtmMixturePickupPointsDetailComponent }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: LTM_UNIT_URL,
        children: [
            {
                path: LIST_URL,
                component: UnitListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: UnitDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_PERIODICITY_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmPeriodicitiesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmPeriodicitiesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_TEST_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmTestTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmTestTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_TEST_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmTestListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmTestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    // {
    //     path: LTM_CHEMICAL_TEST_URL, component: LtmBatchInputComponent, canActivate: [loginGuard], data: { testingMode: CHEMICAL_TEST }
    // },
    // {
    //     path: LTM_PHYSICAL_TEST_URL, component: LtmBatchInputComponent, canActivate: [loginGuard], data: { testingMode: PHYSICAL_TEST }
    // },
    // {
    //     path: LTM_DEPOSIT_TEST_URL, component: LtmBatchInputComponent, canActivate: [loginGuard], data: { testingMode: DEPOSIT_TEST }
    // },
    // {
    //     path: LTM_RAW_MATERIAL_TEST_URL, component: LtmBatchInputComponent, canActivate: [loginGuard], data: { testingMode: RAW_MATERIAL_TEST }
    // },

    {
        path: LTM_CHEMICAL_TEST_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmTestingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmBatchInputComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: { testingMode: CHEMICAL_TEST }
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_PHYSICAL_TEST_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmPhysicalTestingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmBatchInputComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: { testingMode: PHYSICAL_TEST }
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_DEPOSIT_TEST_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmDepositTestingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmBatchInputComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: { testingMode: DEPOSIT_TEST }
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_RAW_MATERIAL_TEST_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmRmTestingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmBatchInputComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: { testingMode: RAW_MATERIAL_TEST }
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [loginGuard],
        data: { reportBase: 'ltm', isLTM: true }
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: LTM_BLEACHER_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmBleacherListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmBleacherDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_ZONE_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmZoneListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmZoneDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: LTM_DEPOSIT_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmDepositListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmDepositDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: LTM_SUPPLIER_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmSupplierListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmSupplierDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
