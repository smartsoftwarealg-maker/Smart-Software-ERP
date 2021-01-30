import {
    COMMON_REPORT_PARAMS_URL,
    LOOKUPS_URL,
} from '../constants';

import {Routes} from '@angular/router';
import {SALES_DELIVERY_URL} from "../../../../../libs/sales/api-delivery/src";
import {DeliveryDetailComponent, DeliveryListComponent} from "../../../../../libs/sales/ui-delivery/src";
import {TotalComponent} from "../../../../../libs/stock/ui-totals/src";
import {ABS_INDEX_URL, CanActivateService, DETAIL_URL, LIST_URL} from "../../../../../libs/common/api-common/src";
import {DeliveryLinesListComponent} from "../../../../../libs/sales/ui-delivery-lines/src";


export const mainRoutes: Routes = [
    {
        path: SALES_DELIVERY_URL,
        children: [
            {
                path: LIST_URL,
                component: DeliveryListComponent,
                canActivate: [CanActivateService],
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
