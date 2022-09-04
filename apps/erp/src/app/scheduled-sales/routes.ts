import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    LOGISTICS_ACTIVITY_URL, SCH_SALES_MODE_URL,
    SS_ARTICLE_URL,
    SS_DISCOUNTS_URL,
    SS_PROJECTS_URL,
    SS_QUOTA_URL, SS_SCHEDULE_URL
} from '../common';
import {ProjectListComponent, ProjectDetailComponent} from '@ss/scheduled-sales/projects';
import {ArticleDetailComponent, ArticleListComponent} from '@ss/scheduled-sales/article';
import {
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
import {
    SalesModeListComponent
} from '../../../../../libs/scheduled-sales/sales-quota/src/lib/sales-mode-list/sales-mode-list.component';
import {
    SalesModeDetailComponent
} from '../../../../../libs/scheduled-sales/sales-quota/src/lib/sales-mode-detail/sales-mode-detail.component';

export const schedSalesRoutes: Routes = [
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
        path: SCH_SALES_MODE_URL,
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
