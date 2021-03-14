import {
    ADMINISTRATION_BANK_URL,
    ADMINISTRATION_CENTER_URL,
    ADMINISTRATION_COMPANY_URL,
    ADMINISTRATION_REPORT_CATALOG_URL,
    ADMINISTRATION_SMTP_URL,
    LOOKUPS_URL,
} from '../constants';
import {ABS_INDEX_URL, CanActivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {BankDetailComponent, BankListComponent} from "@ss/administration/ui-bank";
import {CompanyDetailComponent, CompanyListComponent} from "@ss/administration/ui-company";
import {CenterDetailComponent, CenterListComponent} from "@ss/administration/ui-center";
import {SmtpDetailComponent, SmtpListComponent} from "@ss/administration/ui-smtp";
import {ReportCatalogDetailComponent, ReportCatalogListComponent} from "@ss/administration/ui-report-catalog";
import {TotalComponent} from "@ss/logistics/ui-totals";
import {CirculationComponent} from "@ss/logistics/ui-circulation";
import {AgentBalanceComponent} from "@ss/logistics/ui-agent-balance";
import {CardComponent} from "@ss/logistics/ui-card";
import {AgentDebtsComponent} from "@ss/logistics/ui-agent-debts";
import {UiStockInfoComponent} from "@ss/logistics/ui-stock-info";

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./administration-lookups.module').then(m => m.AdministrationLookupsModule)
    },
    {
        path: ADMINISTRATION_BANK_URL,
        children: [
            {
                path: LIST_URL,
                component: BankListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: BankDetailComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_SMTP_URL,
        children: [
            {
                path: LIST_URL,
                component: SmtpListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SmtpDetailComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_COMPANY_URL,
        children: [
            {
                path: LIST_URL,
                component: CompanyListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CompanyDetailComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_CENTER_URL,
        children: [
            {
                path: LIST_URL,
                component: CenterListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CenterDetailComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_REPORT_CATALOG_URL,
        children: [
            {
                path: LIST_URL,
                component: ReportCatalogListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ReportCatalogDetailComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const docInfoRoutes: Routes = [
    {
        path: 'totals',
        component: TotalComponent
    },
    {
        path: 'circulation',
        component: CirculationComponent
    },
    {
        path: 'stock',
        component: UiStockInfoComponent
    },
    {
        path: 'card',
        component: CardComponent
    },
    {
        path: 'agent-balance',
        component: AgentBalanceComponent
    },
    {
        path: 'agent-debts',
        component: AgentDebtsComponent
    }
];
