import {
    COMMON_CUSTOMER_PROFILE_URL,
    CSPACE_REPORTS_URL, SS_CUSTOMER_BALANCE_URL, SS_CUSTOMER_HISTORY_URL,
    SS_PARTNER_SCHEDULE_URL, SS_QUOTA_URL
} from '../common';
import {Routes} from '@angular/router';
import { ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";
import {
    SalesQuotaDetailComponent,
    SalesQuotaListComponent, SalesScheduleDetailComponent, SalesScheduleListComponent
} from '@ss/scheduled-sales/sales-quota';
import { CustomerBalanceComponent, CustomerSalesHistoryComponent } from 'scheduled-sales/customer-history';
import { EMPSPACE_REPOERT_URL } from '../../../../empspace/src/app/common';
import { loginGuard } from '../../../../empspace/src/app/empspace/routes';

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
        path: SS_CUSTOMER_HISTORY_URL,
        component: CustomerSalesHistoryComponent,
        canActivate: [CanActivateService],
    },

    {
        path: CSPACE_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [CanActivateService],
        data: { reportBase: 'cspace' }
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
