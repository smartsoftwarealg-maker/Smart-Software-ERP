import {
    ABS_INDEX_URL, CanDeactivateService, CustomerCanActivateService, LIST_URL
} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    LOGISTICS_ACTIVITY_URL,
    SS_SALES_MODE_URL,
    SS_ARTICLE_URL,
    SS_DISCOUNTS_URL,
    SS_PARTNER_SCHEDULE_URL,
    SS_PROJECTS_URL,
    SS_QUOTA_URL,
    SS_SCHEDULE_URL,
    SS_TRUCKS_URL,
    LOGISTICS_AGENT_URL,
    LOGISTICS_VAT_URL,
    LOGISTICS_PAY_METHOD_URL, SALES_CATEGORY_URL, DASHBOARD_URL, SS_COMPLAINTS_URL, COMMON_REPORTS_URL
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
    DiscountListComponent, SalesCategoryDetailComponent, SalesCategoryListComponent,
    VatDetailComponent,
    VatListComponent
} from '@ss/common/ui-lookup';
import {SupplierTrucksDetailComponent, SupplierTrucksListComponent} from '@ss/scheduled-sales/supplier-trucks';
import { loginGuard, ssProjectGuard } from '../erp-guards';
import {
    AgentDetailComponent,
    AgentListComponent,
    AppArchiveDetailComponent,
    AppArchiveListComponent
} from '@ss/logistics/ui-agent';
import { AGENT_ARCHIVES } from '@ss/common/app-archive';
import { PayMethodDetailComponent, PayMethodListComponent } from '@ss/logistics/ui-pay-method';
import { DashboardComponent } from '@ss/dashboard';
import { CustomerComplaintsDetailComponent, CustomerComplaintsListComponent } from '@customer-complaints-list';
import { ReportViewComponent } from '@ss/common/ui-report-param';

export const scheduledSalesRoutes: Routes = [
    {
        path: LOGISTICS_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AgentDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: {sales: true},
                        children: [
                            { path: '', redirectTo: 'archive', pathMatch: 'full'},
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: AGENT_ARCHIVES }},
                                ]
                            }
                        ]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: SS_TRUCKS_URL,
        children: [
            {
                path: LIST_URL,
                component: SupplierTrucksListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SupplierTrucksDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DiscountDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: SS_PARTNER_SCHEDULE_URL,
        component: PartnerScheduleDetailComponent,
        canActivate: [loginGuard],
        canDeactivate: [CanDeactivateService]
    },

    {
        path: SS_SCHEDULE_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesScheduleListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SalesScheduleDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SalesQuotaDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SalesModeDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ProjectDetailComponent,
                canActivate: [loginGuard, ssProjectGuard],
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
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: LOGISTICS_VAT_URL,
        children: [
            {
                path: LIST_URL,
                component: VatListComponent
            },
            {
                path: ':id',
                component: VatDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: LOGISTICS_PAY_METHOD_URL,
        children: [
            {
                path: LIST_URL,
                component: PayMethodListComponent
            },
            {
                path: ':id',
                component: PayMethodDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },

    {
        path: SALES_CATEGORY_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesCategoryListComponent
            },
            {
                path: ':id',
                component: SalesCategoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
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
        path: COMMON_REPORTS_URL,
        data: { reportBase: 'ssales' },
        component: ReportViewComponent,
        canActivate: [loginGuard]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
