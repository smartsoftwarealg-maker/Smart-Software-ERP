import {
    LOOKUPS_URL,
    COMMON_REPORT_PARAMS_URL, PATIENTS_PAYMENTS_URL, LOGISTICS_PAYMENTS_URL
} from '../common';
import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    GlobalBalanceComponent
} from '@ss/exchange/ui-info';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {PaymentsDetailComponent, PaymentsListComponent} from "@ss/logistics/payments";

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./exchange-lookups.module').then(m => m.ExchangeLookupsModule)
    },
    {
        path: PATIENTS_PAYMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PaymentsListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_PAYMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PaymentsListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORT_PARAMS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'patients'},
                component: ReportViewComponent,
                canActivate: [CanActivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
