import {Routes} from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL, CanDeactivateService} from '@ss/common/api-common';
import {
    COMMON_REPORTS_URL,
    DASHBOARD_URL,
    docInfoRoutes,
    PURCHASE_QUOTATION_URL, PURCHASE_REQUEST_URL, LOGISTICS_ARTICLES_URL, STOCK_ARTICLE_URL
} from '../common';
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
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {
    PurchaseRequestDetailComponent,
    PurchaseRequestLinesDetailComponent,
    PurchaseRequestListComponent
} from '@ss/purchases/ui-purchase-request';
import {ArticleDetailComponent, ArticleListComponent} from '@ss/stock/ui-article';

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
        path: PURCHASE_REQUEST_URL,
        children: [
            {
                path: LIST_URL,
                component: PurchaseRequestListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: PurchaseRequestLinesDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: PurchaseRequestDetailComponent,
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
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [CanActivateService],
    },
    {
        path: COMMON_REPORTS_URL,
        data: { reportBase: 'purchases' },
        component: ReportViewComponent,
        canActivate: [CanActivateService]
    },
    {
        path: STOCK_ARTICLE_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleListComponent,
                canActivate: [CanActivateService],
                data: { price: 'awp' },
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_ARTICLES_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
];
