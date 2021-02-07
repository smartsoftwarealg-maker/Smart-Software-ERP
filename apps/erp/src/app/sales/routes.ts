import { SALES_DELIVERY_URL,
} from '../constants';

import {Routes} from '@angular/router';
import {DeliveryDetailComponent, DeliveryListComponent} from "@ss/sales/ui-delivery";
import {ABS_INDEX_URL, CanActivateService, DETAIL_URL, LINES_DETAIL_URL, LIST_URL} from "@ss/common/api-common";
import {DeliveryLinesDetailComponent, DeliveryLinesListComponent} from "@ss/sales/ui-delivery-lines";
import {INVENTORY_ENTRY_URL} from "@ss/stock/api-inventory-entry";
import {TotalComponent} from "@ss/stock/ui-totals";
import {DELIVERY_URL} from "@ss/sales/api-delivery";


export const mainRoutes: Routes = [
    {
        path: SALES_DELIVERY_URL,
        children: [
            {
                path: LIST_URL,
                component: DeliveryListComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: 'totals',
                        data: {documentURL: DELIVERY_URL},
                        component: TotalComponent,
                        canActivate: [CanActivateService]
                    },
                    {
                        path: '**',
                        redirectTo: 'totals',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: LINES_DETAIL_URL,
                component: DeliveryLinesDetailComponent,
                canActivate: [CanActivateService]
            },
            {
                path: DETAIL_URL,
                component: DeliveryDetailComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: '',
                        component: DeliveryLinesListComponent,
                        canActivate: [CanActivateService]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
