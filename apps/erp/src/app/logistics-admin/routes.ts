import {
    LOGISTICS_AGENT_URL,
    LOGISTICS_OPTION_URL,
    LOGISTICS_PAY_METHOD_URL,
    LOOKUPS_URL,
    LOGISTICS_ACTIVITY_URL,
    LOGISTICS_AGENT_TYPE_URL,
    LOGISTICS_COMPANY_TYPE_URL,
    LOGISTICS_CURRENCY_URL,
    LOGISTICS_VAT_URL,
    LOGISTICS_NUMBERING_URL,
    SALES_CATEGORY_URL,
    docInfoRoutes,
    LOGISTICS_ARTICLES_URL,
    STOCK_UNITS_URL,
    LOGISTICS_CUSTOMER_URL,
    LOGISTICS_SUPPLIER_URL,
    LOGISTICS_ORDER_ANOMALIES_URL,
    LOGISTICS_TRANSPORTER_URL,
    DELIVERY_TIME_URL,
    LOGISTICS_AGENT_MERGE_URL, LOGISTICS_DELIVERY_TIME_URL, LOGISTICS_SHIPMENT_MODE_URL, PACKAGING_UNITS_URL,
    LOGISTICS_INTERNAL_AGENT_URL, LOGISTICS_UNIT_URL
} from '../common';
import {ABS_INDEX_URL, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {PayMethodDetailComponent, PayMethodListComponent} from '@ss/logistics/ui-pay-method';
import {
    AppArchiveDetailComponent,
    AgentDetailComponent,
    AgentListComponent,
    AppArchiveListComponent
} from '@ss/logistics/ui-agent';
import {
    ActivityDetailComponent,
    ActivityListComponent,
    AgentTypeDetailComponent,
    AgentTypeListComponent,
    CompanyTypeDetailComponent,
    CompanyTypeListComponent,
    CurrencyDetailComponent,
    CurrencyListComponent,
    SalesCategoryDetailComponent,
    SalesCategoryListComponent, UnitDetailComponent, UnitListComponent,
    VatDetailComponent,
    VatListComponent
} from '@ss/common/ui-lookup';
import {OptionsDetailComponent} from '@ss/logistics/ui-options';
import {
    DocumentNumberingDetailComponent,
    DocumentNumberingListComponent
} from '@ss/logistics/document-numbering';
import {loginGuard} from '../erp-guards';
import { AGENT_ARCHIVES } from '@ss/common/app-archive';
import { ArticleDetailComponent, ArticleListComponent } from '@ss/master-data/ui-article';
import { LogisticsOrderAnomaliesComponent } from '@logistics/order-anomalies';
import {
    DeliveryTimeDetailComponent,
    DeliveryTimeListComponent
} from '@ss/common/ui-lookup';
import { AgentMergeComponent } from '@ss/logistics/agent-merge';
import {
    ShipmentModeDetailComponent,
    ShipmentModeListComponent
} from '@ss/common/ui-lookup';

import {PackagingUnitsDetailComponent, PackagingUnitsListComponent} from "@ss/logistics/packaging-units";

export const mainRoutes: Routes = [
    // {
    //     path: LOOKUPS_URL,
    //     loadChildren: () => import('./logistics-admin-lookups.module').then(m => m.LogisticsAdminLookupsModule)
    // },
    {
        path: LOGISTICS_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true},
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
                        data: { sales: true },
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
        path: LOGISTICS_CUSTOMER_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true, customer: true },
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
                        data: {sales: true, customer: true },
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
        path: LOGISTICS_TRANSPORTER_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true, transporter: true },
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
                        data: {sales: true, transporter: true },
                        children: [
                            //{ path: '', redirectTo: 'transport', pathMatch: 'full'},
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: AGENT_ARCHIVES }},
                                ]
                            },

                        ]
                    }
                ]
            },
        ]
    },
    {
        path: LOGISTICS_INTERNAL_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true, internalAgent: true },
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
                        data: {sales: true, internalAgent: true },
                        children: [
                            //{ path: '', redirectTo: 'transport', pathMatch: 'full'},
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: AGENT_ARCHIVES }},
                                ]
                            },

                        ]
                    }
                ]
            },
        ]
    },
    {
        path: LOGISTICS_UNIT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true, unit: true },
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
                        data: {sales: true, unit: true },
                        children: [
                            //{ path: '', redirectTo: 'transport', pathMatch: 'full'},
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: AGENT_ARCHIVES }},
                                ]
                            },

                        ]
                    }
                ]
            },
        ]
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
        path: LOGISTICS_PAY_METHOD_URL,
        children: [
            {
                path: LIST_URL,
                component: PayMethodListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: PayMethodDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: LOGISTICS_ARTICLES_URL,
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
        path: LOGISTICS_VAT_URL,
        children: [
            {
                path: LIST_URL,
                component: VatListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: VatDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: DELIVERY_TIME_URL,
        children: [
            {
                path: LIST_URL,
                component: DeliveryTimeListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: DeliveryTimeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PACKAGING_UNITS_URL,
        children: [
            {
                path: LIST_URL,
                component: PackagingUnitsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: PackagingUnitsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_AGENT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentTypeListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: AgentTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_COMPANY_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: CompanyTypeListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: CompanyTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_CURRENCY_URL,
        children: [
            {
                path: LIST_URL,
                component: CurrencyListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: CurrencyDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_ACTIVITY_URL,
        children: [
            {
                path: LIST_URL,
                component: ActivityListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: ActivityDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SALES_CATEGORY_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesCategoryListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: SalesCategoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_NUMBERING_URL,
        children: [
            {
                path: LIST_URL,
                component: DocumentNumberingListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: DocumentNumberingDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_UNITS_URL,
        children: [
            {
                path: LIST_URL,
                component: UnitListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: UnitDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_OPTION_URL,
        component: OptionsDetailComponent,
        canActivate: [loginGuard],
        canDeactivate: [CanDeactivateService]
    },
    {
        path: LOGISTICS_AGENT_MERGE_URL,
        component: AgentMergeComponent,
        canActivate: [loginGuard],
        canDeactivate: [CanDeactivateService]
    },
    {
        path: LOGISTICS_ORDER_ANOMALIES_URL,
        component: LogisticsOrderAnomaliesComponent,
        canActivate: [loginGuard]
    },

    {
        path: LOGISTICS_DELIVERY_TIME_URL,
        children: [
            {
                path: LIST_URL,
                component: DeliveryTimeListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: DeliveryTimeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: LOGISTICS_SHIPMENT_MODE_URL,
        children: [
            {
                path: LIST_URL,
                component: ShipmentModeListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: ShipmentModeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
