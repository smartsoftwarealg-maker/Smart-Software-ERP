import {Routes} from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL, CanDeactivateService} from "@ss/common/api-common";
import {docInfoRoutes} from "../administration/routes";
import {
    PurchaseOrderDetailComponent, PurchaseOrderLinesDetailComponent,
    PurchaseOrderListComponent
} from "@ss/purchases/ui-purchase-order";
import {PURCHASE_RECEPTION_URL, PURCHASE_ORDER_URL} from "../constants";
import {ReceptionLinesDetailComponent, ReceptionListComponent} from "@ss/purchases/ui-reception";
import {ReceptionDetailComponent} from "@ss/purchases/ui-reception";

export const routes: Routes = [
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
                canActivate: [CanActivateService]
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
                canDeactivate: [CanDeactivateService]
            },
            {
                path: ':id',
                component: ReceptionDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
];
