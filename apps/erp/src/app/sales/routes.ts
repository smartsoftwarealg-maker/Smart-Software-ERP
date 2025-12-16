import { Routes } from '@angular/router';
import { DeliveryDetailComponent, DeliveryListComponent } from '@ss/sales/ui-delivery';
import { ABS_INDEX_URL, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import { DeliveryLinesDetailComponent, DeliveryLinesListComponent } from '@ss/sales/ui-delivery-lines';
import {
    ADMINISTRATION_REPORT_PRIVILEGE_URL,
    COMMON_REPORTS_URL,
    DASHBOARD_URL,
    docInfoRoutes, LOGISTICS_AGENT_URL, LOGISTICS_CUSTOMER_URL,
    SALES_AD_URL, SALES_DISCOUNT_TURNOVER, SALES_DISCOUNT_URL, SALES_MASTER_WORKS_URL, SALES_PRICE_LIST_URL,
    SALES_SECTORS_URL, SALES_SERVICE_ARTICLE_URL, SALES_FREE_INVOICE_URL
} from '../common';
import { OrderListComponent } from '@ss/sales/ui-sales-order';
import { OrderDetailComponent } from '@ss/sales/ui-sales-order';
import { OrderLinesDetailComponent, OrderLinesListComponent } from '@ss/sales/ui-order-lines';
import { InvoiceLinesListComponent, InvoiceListComponent } from '@ss/sales/ui-invoice';
import { InvoiceLinesDetailComponent } from '@ss/sales/ui-invoice';
import { InvoiceDetailComponent } from '@ss/sales/ui-invoice';
import {
    InvoiceCancellationDetailComponent,
    InvoiceCancellationLinesListComponent,
    InvoiceCancellationListComponent
} from '@ss/sales/ui-invoice-cancellation';
import {
    DeliveryCancellationDetailComponent,
    DeliveryCancellationLinesDetailComponent, DeliveryCancellationLinesListComponent,
    DeliveryCancellationListComponent
} from '@ss/sales/ui-delivery-cancellation';

import {
    ProformaDetailComponent,
    ProformaLinesDetailComponent,
    ProformaLinesListComponent,
    ProformaListComponent
} from '@ss/sales/ui-proforma';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {SalesAdsDetailComponent, SalesAdsListComponent} from '@ss/sales/ecommerce';
import {loginGuard} from '../erp-guards';
import {
    AgentDetailComponent,
    AgentListComponent,
    AppArchiveDetailComponent,
    AppArchiveListComponent
} from '@ss/logistics/ui-agent';
import { ServiceArticleDetailComponent, ServiceArticleListComponent } from '@ss/service-sales/service-articles';
import { AGENT_ARCHIVES } from '@ss/common/app-archive';
import { ReportPrivilegesComponent } from '@common/report-privileges';
import { PriceListDetailComponent, PriceListListComponent } from '@ss/master-data/price-list';
import { DiscountsScaleDetailComponent, DiscountsListComponent } from '@ss/sales/ui-discounts';
import {
    SalesDiscountComponent
} from '@ss/sales/ui-discounts';
import {SectorsDetailComponent, SectorsListComponent} from '@ss/sales/ui-sectors';
import {MasterWorksDetailComponent, MasterWorksListComponent} from '@ss/sales/ui-master_works';
import {
    FreeInvoiceLinesDetailComponent,
    FreeInvoiceLinesListComponent,
    FreeInvoiceDetailComponent,
    FreeInvoiceListComponent
} from "@ss/transactions-common/ui-free-invoice";

export const lookupRoutes: Routes = [];

export const mainRoutes: Routes = [
    {
        path: 'cdelivery',
        children: [
            {
                path: LIST_URL,
                component: DeliveryCancellationListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: DeliveryCancellationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: DeliveryCancellationLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: DeliveryCancellationLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: 'cinvoice',
        children: [
            {
                path: LIST_URL,
                component: InvoiceCancellationListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InvoiceCancellationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: InvoiceCancellationLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: DeliveryCancellationLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: 'invoice',
        children: [
            {
                path: LIST_URL,
                component: InvoiceListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InvoiceDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: InvoiceLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: InvoiceLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: 'export-invoice',
        children: [
            {
                path: LIST_URL,
                component: InvoiceListComponent,
                canActivate: [loginGuard],
                data: { showCurrency: true },
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InvoiceDetailComponent,
                data: { showCurrency: true },
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: InvoiceLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: InvoiceLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: LOGISTICS_CUSTOMER_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true, customer: true },
                children: docInfoRoutes
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AgentDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: {sales: true, customer: true },
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
        ]
    },
    {
        path: 'delivery',
        children: [
            {
                path: LIST_URL,
                component: DeliveryListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: DeliveryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: DeliveryLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: DeliveryLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: 'order',
        children: [
            {
                path: LIST_URL,
                component: OrderListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: OrderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: OrderLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: OrderLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: 'proforma',
        children: [
            {
                path: LIST_URL,
                component: ProformaListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ProformaDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: ProformaLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ProformaLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: SALES_AD_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesAdsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SalesAdsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SALES_DISCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: DiscountsListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: DiscountsScaleDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SALES_DISCOUNT_TURNOVER,
        children: [
            {
                path: LIST_URL,
                component: SalesDiscountComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SALES_SECTORS_URL,
        children: [
            {
                path: LIST_URL,
                component: SectorsListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: SectorsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SALES_MASTER_WORKS_URL,
        children: [
            {
                path: LIST_URL,
                component: MasterWorksListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: MasterWorksDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: LOGISTICS_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true},
                children: docInfoRoutes
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AgentDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: { sales: true },
                        children: [
                            { path: '', redirectTo: 'archive', pathMatch: 'full'},
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, canDeactivate: [CanDeactivateService], data: { appId: AGENT_ARCHIVES }},
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
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: COMMON_REPORTS_URL,
        data: { reportBase: 'sales' },
        component: ReportViewComponent,
        canActivate: [loginGuard]
    },
    {
        path: SALES_PRICE_LIST_URL,
        children: [
            {
                path: LIST_URL,
                component: PriceListListComponent,
                canActivate: [loginGuard],
                // children: docInfoRoutes
            },
            {
                path: ':id',
                component: PriceListDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                // children: docInfoRoutes
            },
        ]
    },
    {
        path: SALES_SERVICE_ARTICLE_URL,
        children: [
            {
                path: LIST_URL,
                component: ServiceArticleListComponent,
                canActivate: [loginGuard],
                // children: docInfoRoutes
            },
            {
                path: ':id',
                component: ServiceArticleDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                // children: docInfoRoutes
            },
        ]
    },
    {
        path: ADMINISTRATION_REPORT_PRIVILEGE_URL,
        component: ReportPrivilegesComponent,
        data: {reportBase: 'sales'},
        canActivate: [loginGuard]
    },
    {
        path: SALES_FREE_INVOICE_URL,
        children: [
            {
                path: LIST_URL,
                component: FreeInvoiceListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: FreeInvoiceDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: {app: 'sales'},
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: FreeInvoiceLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: FreeInvoiceLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
