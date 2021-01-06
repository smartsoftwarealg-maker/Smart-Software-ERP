import {
    ADMINISTRATION_BANK_URL,
    ADMINISTRATION_CENTER_URL,
    ADMINISTRATION_COMPANY_URL, ADMINISTRATION_REPORT_CATALOG_URL, ADMINISTRATION_SMTP_URL,
    LOOKUPS_URL,
} from '../constants';
import {ABS_INDEX_URL, CanActivateService, DETAIL_URL, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {BankDetailComponent, BankListComponent} from "@ss/administration/ui-bank";
import {CompanyDetailComponent, CompanyListComponent} from "@ss/administration/ui-company";
import {CenterDetailComponent, CenterListComponent} from "@ss/administration/ui-center";
import {SmtpListComponent, SmtpDetailComponent} from "@ss/administration/ui-smtp";
import {ReportCatalogListComponent, ReportCatalogDetailComponent} from "@ss/administration/ui-report-catalog";


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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
