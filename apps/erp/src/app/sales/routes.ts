
import {Routes} from '@angular/router';
import {DeliveryDetailComponent, DeliveryListComponent} from "@ss/sales/ui-delivery";
import {ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL} from "@ss/common/api-common";
import {DeliveryLinesDetailComponent} from "@ss/sales/ui-delivery-lines";
import {TotalComponent} from "@ss/logistics/ui-totals";
import {CirculationComponent} from "@ss/logistics/ui-circulation";
import {docInfoRoutes} from "../administration/routes";

export const lookupRoutes: Routes = []

export const mainRoutes: Routes = [
    {
        path: 'delivery',
        children: [
            {
                path: 'list',
                component: DeliveryListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL,
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
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
