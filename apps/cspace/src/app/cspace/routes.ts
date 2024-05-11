import {
    COMMON_CUSTOMER_PROFILE_URL,
    CSPACE_REPORTS_URL, SS_COMPLAINTS_URL, SS_CUSTOMER_BALANCE_URL, SS_CUSTOMER_HISTORY_URL, SS_HOME_PAGE_URL,
    SS_PARTNER_SCHEDULE_URL, SS_PAYMENT_URL, SS_QUOTA_URL
} from '../common';
import {Routes} from '@angular/router';
import { ABS_INDEX_URL, CustomerCanActivateService, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";
import {
    SalesQuotaDetailComponent,
    SalesQuotaListComponent, SalesScheduleDetailComponent, SalesScheduleListComponent
} from '@ss/scheduled-sales/sales-quota';
import { CustomerBalanceComponent, CustomerSalesHistoryComponent } from 'scheduled-sales/customer-history';
import { PaymentsListComponent } from 'scheduled-sales/payments';
import { HomePageComponent } from 'home.page';
import { CustomerComplaintsDetailComponent, CustomerComplaintsListComponent } from 'customer-complaints-list';
import { ScheduledSalesMainPageComponent } from 'scheduled-sales/main-page';
import { ScheduledSalesProductsPageComponent } from 'scheduled-sales/products-page';

export const cSpaceRoutes: Routes = [
    {
        path: SS_PARTNER_SCHEDULE_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesScheduleListComponent,
                canActivate: [CustomerCanActivateService]
            },
            {
                path: ':id',
                component: SalesScheduleDetailComponent,
                canActivate: [CustomerCanActivateService],
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
                canActivate: [CustomerCanActivateService]
            },
            {
                path: ':id',
                component: SalesQuotaDetailComponent,
                canActivate: [CustomerCanActivateService],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: SS_COMPLAINTS_URL,
        children: [
            {
                path: LIST_URL,
                component: CustomerComplaintsListComponent,
                canActivate: [CustomerCanActivateService]
            },
            {
                path: ':id',
                component: CustomerComplaintsDetailComponent,
                canActivate: [CustomerCanActivateService],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: COMMON_CUSTOMER_PROFILE_URL,
        component: CustomerProfileComponent,
        canActivate: [CustomerCanActivateService],
    },
    {
        path: SS_CUSTOMER_BALANCE_URL,
        component: CustomerBalanceComponent,
        canActivate: [CustomerCanActivateService],
    },
    {
        path: SS_HOME_PAGE_URL,
        component: HomePageComponent,
        children: [
            {
                path: '', redirectTo: 'main', pathMatch: 'full'
            },
            {
                path: 'main', component: ScheduledSalesMainPageComponent
            },
            {
                path: 'products', component: ScheduledSalesProductsPageComponent
            }
        ]
    },
    {
        path: SS_PAYMENT_URL,
        component: PaymentsListComponent,
        canActivate: [CustomerCanActivateService],
    },
    {
        path: SS_CUSTOMER_HISTORY_URL,
        component: CustomerSalesHistoryComponent,
        canActivate: [CustomerCanActivateService],
    },

    {
        path: CSPACE_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [CustomerCanActivateService],
        data: { reportBase: 'cspace' }
    },

    {path: '', redirectTo: SS_HOME_PAGE_URL, pathMatch: 'full'},
    {path: '**', redirectTo: SS_HOME_PAGE_URL, pathMatch: 'full'}
];
