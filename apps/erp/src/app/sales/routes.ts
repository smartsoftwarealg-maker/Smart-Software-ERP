import { Routes } from '@angular/router';
import { DeliveryDetailComponent, DeliveryListComponent } from '@ss/sales/ui-delivery';
import { ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import { DeliveryLinesDetailComponent } from '@ss/sales/ui-delivery-lines';
import {COMMON_REPORTS_URL, DASHBOARD_URL, docInfoRoutes} from '../common';
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
import {DashboardComponent} from '../../../../../libs/dashboard/src';
import {ReportViewComponent} from '../../../../../libs/common/ui-report-param/src';

export const lookupRoutes: Routes = []

export const mainRoutes: Routes = [
    {
        path: 'cdelivery',
        children: [
            {
                path: LIST_URL,
                component: DeliveryCancellationListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: DeliveryCancellationLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: DeliveryCancellationDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InvoiceCancellationLinesDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InvoiceCancellationDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InvoiceLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InvoiceDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: DeliveryLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: DeliveryDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: OrderLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: OrderDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: ProformaLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ProformaDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL }
        ]
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [CanActivateService],
    },
    {
        path: COMMON_REPORTS_URL,
        data: { reportBase: 'sales' },
        component: ReportViewComponent,
        canActivate: [CanActivateService]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
