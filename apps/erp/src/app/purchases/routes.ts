import {Routes} from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL, CanDeactivateService} from '@ss/common/api-common';
import {docInfoRoutes, MISSION_TRAJECTORIES, PAYMENT_ORDER, PURCHASE_QUOTATION_URL} from '../common';
import {
    PurchaseOrderDetailComponent, PurchaseOrderLinesDetailComponent,
    PurchaseOrderListComponent
} from '@ss/purchases/ui-purchase-order';
import {PURCHASE_RECEPTION_URL, PURCHASE_ORDER_URL} from '../common';
import {ReceptionLinesDetailComponent, ReceptionListComponent} from '@ss/purchases/ui-reception';
import {ReceptionDetailComponent} from '@ss/purchases/ui-reception';
import {
    QuotationDetailComponent,
    QuotationLinesDetailComponent,
    QuotationListComponent
} from '@ss/purchases/ui-quotation';
import {PaymentOrderDetailComponent, PaymentOrderListComponent} from '@ss/purchases/payment-orders';

export const routes: Routes = [
    {
        path: PURCHASE_QUOTATION_URL,
        children: [
            {
                path: LIST_URL,
                component: QuotationListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: QuotationLinesDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: QuotationDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PURCHASE_ORDER_URL,
        children: [
            {
                path: LIST_URL,
                component: PurchaseOrderListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: PurchaseOrderLinesDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: PurchaseOrderDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PURCHASE_RECEPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: ReceptionListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: ReceptionLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ReceptionDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
];
