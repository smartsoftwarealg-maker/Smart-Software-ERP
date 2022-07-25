import {
    LOGISTICS_AGENT_URL,
    LOGISTICS_OPTION_URL,
    LOGISTICS_PAY_METHOD_URL,
    LOOKUPS_URL, LOGISTICS_ACTIVITY_URL,
    LOGISTICS_AGENT_TYPE_URL,
    LOGISTICS_COMPANY_TYPE_URL,
    LOGISTICS_CURRENCY_URL,
    LOGISTICS_VAT_URL, LOGISTICS_NUMBERING_URL, LOGISTICS_CATEGORY_URL
} from '../common';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
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
    ClassDetailComponent,
    ClassListComponent,
    CompanyTypeDetailComponent,
    CompanyTypeListComponent,
    CurrencyDetailComponent,
    CurrencyListComponent,
    MarkDetailComponent,
    MarkListComponent, SalesCategoryDetailComponent, SalesCategoryListComponent,
    StoreNameDetailComponent,
    StoreNameListComponent,
    SubclassDetailComponent,
    SubclassListComponent,
    UnitDetailComponent,
    UnitListComponent,
    VatDetailComponent,
    VatListComponent,
} from '@ss/common/ui-lookup';
import {OptionsDetailComponent} from '@ss/logistics/ui-options';
import {
    DocumentNumberingDetailComponent,
    DocumentNumberingListComponent
} from '@ss/logistics/document-numbering';
export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./logistics-admin-lookups.module').then(m => m.LogisticsAdminLookupsModule)
    },
    {
        path: LOGISTICS_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AgentDetailComponent,
                        canActivate: [CanActivateService],
                        canDeactivate: [CanDeactivateService],
                        data: {sales: true},
                        children: [
                            {path: '', component: AppArchiveListComponent},
                            {
                                path: 'detail',
                                children: [
                                    {path: ':id', component: AppArchiveDetailComponent},
                                    {path: '**', redirectTo: '../' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: LOGISTICS_PAY_METHOD_URL,
        children: [
            {
                path: LIST_URL,
                component: PayMethodListComponent
            },
            {
                path: ':id',
                component: PayMethodDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: LOGISTICS_VAT_URL,
        children: [
            {
                path: LIST_URL,
                component: VatListComponent
            },
            {
                path: ':id',
                component: VatDetailComponent,
                canActivate: [CanActivateService],
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
                component: AgentTypeListComponent
            },
            {
                path: ':id',
                component: AgentTypeDetailComponent,
                canActivate: [CanActivateService],
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
                component: CompanyTypeListComponent
            },
            {
                path: ':id',
                component: CompanyTypeDetailComponent,
                canActivate: [CanActivateService],
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
                component: CurrencyListComponent
            },
            {
                path: ':id',
                component: CurrencyDetailComponent,
                canActivate: [CanActivateService],
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
                component: ActivityListComponent
            },
            {
                path: ':id',
                component: ActivityDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_CATEGORY_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesCategoryListComponent
            },
            {
                path: ':id',
                component: SalesCategoryDetailComponent,
                canActivate: [CanActivateService],
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
                component: DocumentNumberingListComponent
            },
            {
                path: ':id',
                component: DocumentNumberingDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_OPTION_URL,
        component: OptionsDetailComponent,
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
