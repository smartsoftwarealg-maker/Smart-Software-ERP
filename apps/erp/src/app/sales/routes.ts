import {Routes} from '@angular/router';
import {DeliveryDetailComponent, DeliveryListComponent} from '@ss/sales/ui-delivery';
import {ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL} from '@ss/common/api-common';
import {DeliveryLinesDetailComponent} from '@ss/sales/ui-delivery-lines';
import {docInfoRoutes} from "../administration/routes";
import {OrderListComponent} from '@ss/sales/ui-sales-order';
import {OrderDetailComponent} from '@ss/sales/ui-sales-order';
import {OrderLinesDetailComponent} from '@ss/sales/ui-order-lines';
import {InvoiceListComponent} from "@ss/sales/ui-invoice";
import {InvoiceLinesDetailComponent} from "@ss/sales/ui-invoice";
import {InvoiceDetailComponent} from "@ss/sales/ui-invoice";
import {
    InvoiceCancellationDetailComponent,
    InvoiceCancellationLinesDetailComponent,
    InvoiceCancellationListComponent
} from "@ss/sales/ui-invoice-cancellation";

export const lookupRoutes: Routes = []

export const mainRoutes: Routes = [
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: InvoiceCancellationDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL}
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: InvoiceDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL}
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DeliveryDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL}
        ]
    },
    { path: 'order',
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
              canActivate: [CanActivateService]
          },
          {
              path: ':id',
              component: OrderDetailComponent,
              canActivate: [CanActivateService],
              children: docInfoRoutes
          },
          {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
          {path: '**', redirectTo: ABS_INDEX_URL}
      ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
