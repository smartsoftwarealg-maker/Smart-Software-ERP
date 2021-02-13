
import {Routes} from '@angular/router';
import {DeliveryDetailComponent, DeliveryListComponent} from "@ss/sales/ui-delivery";
import {ABS_INDEX_URL, CanActivateService, DETAIL_URL, LINES_DETAIL_URL, LIST_URL} from "@ss/common/api-common";
import {DeliveryLinesDetailComponent} from "@ss/sales/ui-delivery-lines";
import {TotalComponent} from "@ss/stock/ui-totals";
import {CirculationComponent} from "@ss/stock/ui-circulation";

export const lookupRoutes: Routes = []

export const mainRoutes: Routes = [
    {
        path: 'delivery',
        children: [
            {
                path: 'list',
                component: DeliveryListComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: 'totals',
                        data: { documentURL: '/delivery' },
                        component: TotalComponent,
                        canActivate: [CanActivateService]
                    },
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
                        path: 'totals',
                        data: { documentURL: "/delivery" },
                        component: TotalComponent,
                        canActivate: [CanActivateService]
                    },
                    {
                        path: 'circulation',
                        data: { documentURL: "/articles/circulation" },
                        component: CirculationComponent,
                        canActivate: [CanActivateService]
                    },
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
