import { Routes } from '@angular/router';
import { DeliveryDetailComponent, DeliveryListComponent } from '@ss/sales/ui-delivery';
import { ABS_INDEX_URL, LINES_DETAIL_URL, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import { DeliveryLinesDetailComponent } from '@ss/sales/ui-delivery-lines';
import {
    COMMON_REPORTS_URL,
    DASHBOARD_URL,
    docInfoRoutes,
    SALES_AD_URL
} from '../common';
import { OrderListComponent } from '@ss/sales/ui-sales-order';
import { OrderDetailComponent } from '@ss/sales/ui-sales-order';
import { OrderLinesDetailComponent } from '@ss/sales/ui-order-lines';
import { InvoiceListComponent } from '@ss/sales/ui-invoice';
import { InvoiceLinesDetailComponent } from '@ss/sales/ui-invoice';
import { InvoiceDetailComponent } from '@ss/sales/ui-invoice';
import {
    InvoiceCancellationDetailComponent,
    InvoiceCancellationLinesDetailComponent,
    InvoiceCancellationListComponent
} from '@ss/sales/ui-invoice-cancellation';
import {
    DeliveryCancellationDetailComponent,
    DeliveryCancellationLinesDetailComponent,
    DeliveryCancellationListComponent
} from '@ss/sales/ui-delivery-cancellation';

import {ProformaDetailComponent, ProformaLinesDetailComponent, ProformaListComponent} from '@ss/sales/ui-proforma';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {SalesAdsDetailComponent, SalesAdsListComponent} from '@ss/sales/ecommerce';
import {loginGuard} from '../erp-guards';

export const lookupRoutes: Routes = []

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
                path: LINES_DETAIL_URL + '/:id',
                component: DeliveryCancellationLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: DeliveryCancellationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL }
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
                path: LINES_DETAIL_URL + '/:id',
                component: InvoiceCancellationLinesDetailComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InvoiceCancellationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL }
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
                path: LINES_DETAIL_URL + '/:id',
                component: InvoiceLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InvoiceDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL }
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
                path: LINES_DETAIL_URL + '/:id',
                component: DeliveryLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: DeliveryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL }
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
                path: LINES_DETAIL_URL + '/:id',
                component: OrderLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: OrderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL }
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
                path: LINES_DETAIL_URL + '/:id',
                component: ProformaLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ProformaDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL }
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
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
