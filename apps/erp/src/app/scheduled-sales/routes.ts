import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    LOGISTICS_ACTIVITY_URL, SS_SALES_MODE_URL,
    SS_ARTICLE_URL,
    SS_DISCOUNTS_URL, SS_PARTNER_SCHEDULE_URL,
    SS_PROJECTS_URL,
    SS_QUOTA_URL, SS_SCHEDULE_URL, SS_TRUCKS_URL
} from '../common';
import {ProjectListComponent, ProjectDetailComponent} from '@ss/scheduled-sales/projects';
import {ArticleDetailComponent, ArticleListComponent} from '@ss/scheduled-sales/article';
import {
    PartnerScheduleDetailComponent,
    SalesModeDetailComponent,
    SalesModeListComponent,
    SalesQuotaDetailComponent,
    SalesQuotaListComponent, SalesScheduleDetailComponent,
    SalesScheduleListComponent
} from '@ss/scheduled-sales/sales-quota';
import {
    ActivityDetailComponent,
    ActivityListComponent,
    DiscountDetailComponent,
    DiscountListComponent
} from '@ss/common/ui-lookup';
import {SupplierTrucksDetailComponent, SupplierTrucksListComponent} from '@ss/scheduled-sales/supplier-trucks';

export const schedSalesRoutes: Routes = [
    {
        path: SS_TRUCKS_URL,
        children: [
            {
                path: LIST_URL,
                component: SupplierTrucksListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SupplierTrucksDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SS_DISCOUNTS_URL,
        children: [
            {
                path: LIST_URL,
                component: DiscountListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DiscountDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: SS_PARTNER_SCHEDULE_URL,
        component: PartnerScheduleDetailComponent,
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },

    {
        path: SS_SCHEDULE_URL,
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
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
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
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: SS_SALES_MODE_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesModeListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SalesModeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: SS_PROJECTS_URL,
        children: [
            {
                path: LIST_URL,
                component: ProjectListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ProjectDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: LOGISTICS_ACTIVITY_URL,
        children: [
            {
                path: LIST_URL,
                component: ActivityListComponent
            },
            {
                path: ':id',
                component: ActivityDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: SS_ARTICLE_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
