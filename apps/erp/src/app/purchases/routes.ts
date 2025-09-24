import {Routes} from '@angular/router';
import {
    ABS_INDEX_URL,
    LIST_URL,
    CanDeactivateService
} from '@ss/common/api-common';
import {
    COMMON_REPORTS_URL,
    DASHBOARD_URL,
    docInfoRoutes,
    PURCHASE_QUOTATION_URL,
    PURCHASE_REQUEST_URL,
    LOGISTICS_ARTICLES_URL,
    STOCK_ARTICLE_URL,
    PURCHASE_RECEPTION_CANCELLATION_URL,
    IMPORT_PURCHASE_RECEPTION_URL, ADMIN_REPORT_RIGHTS_URL, PRICE_REQUEST_URL, LOGISTICS_SUPPLIER_URL,
    PURCHASE_RECEPTION_INVOICE_URL
} from '../common';
import {
    PurchaseOrderDetailComponent,
    PurchaseOrderLinesDetailComponent,
    PurchaseOrderLinesListComponent,
    PurchaseOrderListComponent
} from '@ss/purchases/ui-purchase-order';
import {PURCHASE_RECEPTION_URL, PURCHASE_ORDER_URL} from '../common';
import {
    ReceptionInvoiceLinesListComponent,
    ReceptionLinesDetailComponent,
    ReceptionLinesListComponent,
    ReceptionListComponent
} from '@ss/purchases/ui-reception';
import {ReceptionDetailComponent} from '@ss/purchases/ui-reception';
import {
    QuotationDetailComponent,
    QuotationLinesDetailComponent, QuotationLinesListComponent,
    QuotationListComponent
} from '@ss/purchases/ui-quotation';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {
    PurchaseRequestDetailComponent,
    PurchaseRequestLinesDetailComponent, PurchaseRequestLinesListComponent,
    PurchaseRequestListComponent
} from '@ss/purchases/ui-purchase-request';
import {
    ReceptionCancellationDetailComponent,
    ReceptionCancellationLinesDetailComponent,
    ReceptionCancellationLinesListComponent,
    ReceptionCancellationListComponent
} from '@ss/purchases/reception-cancellation';
import {loginGuard} from '../erp-guards';
import {
    ImportReceptionDetailComponent,
    ImportReceptionLinesDetailComponent,
    ImportReceptionLinesListComponent,
    ImportReceptionListComponent
} from '@ss/purchases/imported-purchases';
import {
    ExtraCostDetailComponent,
    ExtraCostListComponent,
    LocalExtraCostDetailComponent, LocalExtraCostListComponent
} from '@ss/purchases/extra-costs';
import { ReportRightsComponent } from '@ss/administration/reports-rights';
import { ArticleDetailComponent, ArticleListComponent } from '@ss/master-data/ui-article';
import {
    PriceRequestComponent,
    PriceRequestDetailComponent, PriceRequestLinesDetailComponent,
    PriceRequestLinesListComponent
} from '@ss/purchases/preiceRequest';
import { AgentDetailComponent, AgentListComponent } from '@ss/logistics/ui-agent';
import { AGENT_ARCHIVES, AppArchiveDetailComponent, AppArchiveListComponent } from '@ss/common/app-archive';
import {
    ReceptionInvoiceLinesDetailComponent
} from "@ss/purchases/ui-reception";

export const routes: Routes = [
    {
        path: PURCHASE_QUOTATION_URL,
        children: [
            {
                path: LIST_URL,
                component: QuotationListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: QuotationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: QuotationLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: QuotationLinesDetailComponent, canDeactivate: [CanDeactivateService] },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: PURCHASE_ORDER_URL,
        children: [
            {
                path: LIST_URL,
                component: PurchaseOrderListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: PurchaseOrderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: PurchaseOrderLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: PurchaseOrderLinesDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PRICE_REQUEST_URL,
        children: [
            {
                path: LIST_URL,
                component: PriceRequestComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: PriceRequestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: PriceRequestLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: PriceRequestLinesDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: PURCHASE_REQUEST_URL,
        children: [
            {
                path: LIST_URL,
                component: PurchaseRequestListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: PurchaseRequestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: PurchaseRequestLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: PurchaseRequestLinesDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: PURCHASE_RECEPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: ReceptionListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ReceptionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'costs-list', component: ExtraCostListComponent },
                    {
                        path: 'costs-detail',
                        children: [
                            { path: ':id', component: ExtraCostDetailComponent }
                        ]
                    },
                    {
                        path: 'lines-list',
                        component: ReceptionLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ReceptionLinesDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: PURCHASE_RECEPTION_INVOICE_URL,
        children: [
            {
                path: LIST_URL,
                component: ReceptionListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ReceptionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'costs-list', component: ExtraCostListComponent },
                    {
                        path: 'costs-detail',
                        children: [
                            { path: ':id', component: ExtraCostDetailComponent }
                        ]
                    },
                    {
                        path: 'lines-list',
                        component: ReceptionInvoiceLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ReceptionInvoiceLinesDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: IMPORT_PURCHASE_RECEPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: ImportReceptionListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ImportReceptionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'costs-list', component: ExtraCostListComponent },
                    {
                        path: 'costs-detail',
                        children: [
                            { path: ':id', component: ExtraCostDetailComponent }
                        ]
                    },
                    { path: 'lines-list',
                        component: ImportReceptionLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ImportReceptionLinesDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PURCHASE_RECEPTION_CANCELLATION_URL,
        children: [
            {
                path: LIST_URL,
                component: ReceptionCancellationListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ReceptionCancellationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: ReceptionCancellationLinesListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: ReceptionCancellationLinesDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: COMMON_REPORTS_URL,
        data: { reportBase: 'purchases' },
        component: ReportViewComponent,
        canActivate: [loginGuard]
    },
    {
        path: ADMIN_REPORT_RIGHTS_URL,
        component: ReportRightsComponent,
        data: {reportBase: 'purchases'},
    },
    {
        path: LOGISTICS_SUPPLIER_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true, supplier: true },
                children: docInfoRoutes
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AgentDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: {sales: true, supplier: true },
                        children: [
                            { path: '', redirectTo: 'archive', pathMatch: 'full'},
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: AGENT_ARCHIVES }},
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: STOCK_ARTICLE_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleListComponent,
                canActivate: [loginGuard],
                data: { price: 'awp' },
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },

];
