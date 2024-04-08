import {
    COMMON_CUSTOMER_PROFILE_URL,
    COMMON_REPORT_PARAMS_URL, SS_CUSTOMER_BALANCE_URL,
    SS_PARTNER_SCHEDULE_URL, SS_QUOTA_URL
} from '../common';
import {Routes} from '@angular/router';
import { ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";
import {
    PartnerScheduleDetailComponent,
    SalesQuotaDetailComponent,
    SalesQuotaListComponent, SalesScheduleDetailComponent, SalesScheduleListComponent
} from '@ss/scheduled-sales/sales-quota';
import { CustomerBalanceComponent } from 'scheduled-sales/customer-history';

export const cSpaceRoutes: Routes = [
    {
        path: SS_PARTNER_SCHEDULE_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesScheduleListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SalesScheduleDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: SS_QUOTA_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesQuotaListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SalesQuotaDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: COMMON_CUSTOMER_PROFILE_URL,
        component: CustomerProfileComponent,
        canActivate: [CanActivateService],
    },
    {
        path: SS_CUSTOMER_BALANCE_URL,
        component: CustomerBalanceComponent,
        canActivate: [CanActivateService],
    },
    {
        path: COMMON_REPORT_PARAMS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'cspace' },
                component: ReportViewComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
