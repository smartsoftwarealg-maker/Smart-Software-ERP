import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import {
    COMMON_REPORTS_URL,
    DASHBOARD_URL,
    docInfoRoutes,
    LOGISTICS_AGENT_URL, SALES_PROFORMA_URL,
    SALES_SERVICE_ARTICLE_URL, SERVICE_INVOICE_CANCELLATION_URL, SERVICE_INVOICE_URL, SERVICE_ORDER_URL
} from '../common';
import {
    AgentDetailComponent,
    AgentListComponent,
    AppArchiveDetailComponent,
    AppArchiveListComponent
} from '@ss/logistics/ui-agent';
import { loginGuard } from '../erp-guards';
import {
    InvoiceCancellationDetailComponent, InvoiceCancellationListComponent
} from '@ss/sales/ui-invoice-cancellation';
import {InvoiceDetailComponent, InvoiceListComponent} from '@ss/sales/ui-invoice';
import { DashboardComponent } from '@ss/dashboard';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import {
    ProformaDetailComponent,
    ProformaListComponent
} from '@ss/sales/ui-proforma';
import { OrderDetailComponent, OrderListComponent } from '@ss/sales/ui-sales-order';
import { ServiceArticleDetailComponent, ServiceArticleListComponent } from '@ss/service-sales/service-articles';
import {
    ServiceOrderLineDetailComponent,
    ServiceOrderLineListComponent
} from '@ss/service-sales/service-order';
import {
    ServiceProformaLineDetailComponent,
    ServiceProformaLineListComponent
} from '@ss/service-sales/service-proforma';
import { ServiceInvoiceLineDetailComponent, ServiceInvoiceLineListComponent } from '@ss/service-sales/service-invoice';
import {
    ServiceCinvoiceLineListComponent
} from '@ss/service-sales/service-invoice-cancellation';
import {
    ServiceCinvoiceLineDetailComponent
} from '@ss/service-sales/service-invoice-cancellation';

export const ssalesRoutes: Routes = [
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
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full' },
                                    {path: ':id', component: AppArchiveDetailComponent},
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
        path: SERVICE_INVOICE_CANCELLATION_URL,
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
                        component: ServiceCinvoiceLineListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ServiceCinvoiceLineDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: SERVICE_INVOICE_URL,
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
                        component: ServiceInvoiceLineListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ServiceInvoiceLineDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },

    {
        path: SALES_PROFORMA_URL,
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
                        component: ServiceProformaLineListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ServiceProformaLineDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: SERVICE_ORDER_URL,
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
                        component: ServiceOrderLineListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ServiceOrderLineDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
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
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

