import {
    ADMINISTRATION_BANK_URL,
    ADMINISTRATION_CENTER_URL,
    ADMINISTRATION_COMPANY_URL,
    ADMINISTRATION_REPORT_CATALOG_URL,
    ADMINISTRATION_ROLE_URL,
    ADMINISTRATION_SMTP_URL,
    ADMINISTRATION_USER_URL,
    ADMINISTRATION_CITY_URL,
    ADMINISTRATION_COUNTRY_URL,
    ADMINISTRATION_WILAYA_URL,
    ADMINISTRATION_ACCCESSRIGHTS_URL,
    ADMINISTRATION_TRACEABILITY_URL,
    ADMINISTRATION_ORGANIZATIONS_URL,
} from '../common';
import {ABS_INDEX_URL, CanActivateService, LIST_URL, CanDeactivateService} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {BankDetailComponent, BankListComponent} from '@ss/administration/ui-bank';
import {CompanyDetailComponent, CompanyListComponent} from '@ss/administration/ui-company';
import {CenterDetailComponent, CenterListComponent} from '@ss/administration/ui-center';
import {SmtpDetailComponent, SmtpListComponent} from '@ss/administration/ui-smtp';
import {ReportCatalogDetailComponent, ReportCatalogListComponent} from '@ss/administration/ui-report-catalog';
import {UserDetailComponent, UserListComponent} from '@ss/administration/ui-user';
import {
    RoleListComponent,
    RoleDetailComponent,
    CountryListComponent,
    CountryDetailComponent,
    CityListComponent,
    CityDetailComponent,
    WilayaListComponent,
    WilayaDetailComponent
} from '@ss/common/ui-lookup';
import {AccessRightsListComponent} from '@ss/common/ui-access-rights';
import {TraceabilityComponent} from '@ss/common/ui-traceability';
import {OrganizationsComponent} from '@ss/common/ui-organizations';

export const mainRoutes: Routes = [
//    // NOT USED
//    {
//        path: LOOKUPS_URL,
//        loadChildren: () => import('./administration-lookups.module').then(m => m.AdministrationLookupsModule)
//    },
    {
        path: ADMINISTRATION_ORGANIZATIONS_URL,
        component: OrganizationsComponent,
        canActivate: [CanActivateService]
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
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_COUNTRY_URL,
        children: [
            {
                path: LIST_URL,
                component: CountryListComponent
            },
            {
                path: ':id',
                component: CountryDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_ACCCESSRIGHTS_URL,
        component: AccessRightsListComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ADMINISTRATION_TRACEABILITY_URL,
        component: TraceabilityComponent,
        canActivate: [CanActivateService]
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
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
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
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_USER_URL,
        children: [
            {
                path: LIST_URL,
                component: UserListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: UserDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
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
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
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
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_ROLE_URL,
        children: [
            {
                path: LIST_URL,
                component: RoleListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: RoleDetailComponent,
                canActivate: [CanActivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_CITY_URL,
        children: [
            {
                path: LIST_URL,
                component: CityListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CityDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_WILAYA_URL,
        children: [
            {
                path: LIST_URL,
                component: WilayaListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: WilayaDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

//export const lookupRoutes: Routes = [
//    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
//    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
//];
