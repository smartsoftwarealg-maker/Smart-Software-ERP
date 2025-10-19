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
    ADMINISTRATION_ATTRIBUTE_URL,
    ADMINISTRATION_DB_UPDATER_URL,
    ADMINISTRATION_ARCHIVE_DOCUMENTS_URL,
    LOGISTICS_NUMBERING_URL,
    FURNITURE_STATUS_URL,
    ADMIN_DARIRA_URL,
    LOGISTICS_WORKFLOW_URL,
    ADMIN_USER_MESSAGES_URL,
    ADMIN_USER_DOCUMENTS_URL,
    ADMIN_WORKFLOW_INBOX_URL,
    ADMIN_USER_RECEIVED_MESSAGES_URL,
    ADMIN_REPORT_RIGHTS_URL,
    ADMINISTRATION_REPORT_PRIVILEGE_URL,
    ADMIN_WORKFLOW_CHART_URL,
    ADMINISTRATION_PASS_ENCODING_URL,
    ADMINISTRATION_GLOBAL_VALIDATION_URL, ADMINISTRATION_REGION_URL
} from '../common';
import { ABS_INDEX_URL, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import { Routes } from '@angular/router';
import { BankDetailComponent, BankListComponent } from '@ss/administration/ui-bank';
import { CompanyDetailComponent, CompanyListComponent } from '@ss/administration/ui-company';
import { CenterDetailComponent, CenterListComponent } from '@ss/administration/ui-center';
import { SmtpDetailComponent, SmtpListComponent } from '@ss/administration/ui-smtp';
import { ReportCatalogDetailComponent, ReportCatalogListComponent } from '@ss/administration/ui-report-catalog';
import { UserDetailComponent, UserListComponent } from '@ss/administration/ui-user';
import {
    RoleListComponent,
    RoleDetailComponent,
    CountryListComponent,
    CountryDetailComponent,
    CityListComponent,
    CityDetailComponent,
    WilayaListComponent,
    WilayaDetailComponent,
    AppArchiveDocumentListComponent,
    AppArchiveDocumentDetailComponent,
    FurnitureStatusListComponent, FurnitureStatusDetailComponent, DairaListComponent, DairaDetailComponent,
    RegionDetailComponent, RegionListComponent
} from '@ss/common/ui-lookup';
import { AccessRightsListComponent } from '@ss/common/ui-access-rights';
import { TraceabilityComponent } from '@ss/common/ui-traceability';
import {AttributesDetailComponent, AttributesListComponent} from '@ss/custom-attributes';
import {DbUpdaterComponent} from '@ss/administration/db-updater';
import {
    DocumentNumberingDetailComponent,
    DocumentNumberingListComponent
} from '@ss/logistics/document-numbering';
import {
    DocStatusListComponent,
    DocStatusDetailComponent,
    UserMessageListComponent,
    UserMessageDetailComponent,
    UserDocumentListComponent,
    UserDocumentDetailComponent,
    WorkflowInboxListComponent,
    UserReceivedMessageListComponent, UserReceivedMessageDetailComponent, WorkflowChartComponent
} from '@ss/workflow';
import {loginGuard} from '../erp-guards';
import { ReportRightsComponent } from '@ss/administration/reports-rights';
import { ReportPrivilegesComponent } from '@common/report-privileges';
import { PassEncodingComponent } from '@ss/administration/pass-encoding';
import { GlobalValidationComponent } from '@ss/administration/global-validation';

export const mainRoutes: Routes = [
    //    // NOT USED
    //    {
    //        path: LOOKUPS_URL,
    //        loadChildren: () => import('./administration-lookups.module').then(m => m.AdministrationLookupsModule)
    //    },
    {
        path: ADMINISTRATION_ATTRIBUTE_URL,
        children: [
            {
                path: LIST_URL,
                component: AttributesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AttributesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_BANK_URL,
        children: [
            {
                path: LIST_URL,
                component: BankListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: BankDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
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
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_ARCHIVE_DOCUMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: AppArchiveDocumentListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AppArchiveDocumentDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_ACCCESSRIGHTS_URL,
        component: AccessRightsListComponent,
        canActivate: [loginGuard]
    },
    {
        path: ADMINISTRATION_TRACEABILITY_URL,
        component: TraceabilityComponent,
        canActivate: [loginGuard]
    },
    {
        path: ADMINISTRATION_SMTP_URL,
        children: [
            {
                path: LIST_URL,
                component: SmtpListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SmtpDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_COMPANY_URL,
        children: [
            {
                path: LIST_URL,
                component: CompanyListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CompanyDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_USER_URL,
        children: [
            {
                path: LIST_URL,
                component: UserListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: UserDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CenterDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_REPORT_CATALOG_URL,
        children: [
            {
                path: LIST_URL,
                component: ReportCatalogListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ReportCatalogDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_ROLE_URL,
        children: [
            {
                path: LIST_URL,
                component: RoleListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: RoleDetailComponent,
                canActivate: [loginGuard]
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CityDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_DARIRA_URL,
        children: [
            {
                path: LIST_URL,
                component: DairaListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DairaDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_WILAYA_URL,
        children: [
            {
                path: LIST_URL,
                component: WilayaListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: WilayaDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_REGION_URL,
        children: [
            {
                path: LIST_URL,
                component: RegionListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: RegionDetailComponent,
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
                canActivate: [loginGuard]
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
        path: LOGISTICS_WORKFLOW_URL,
        children: [
            {
                path: LIST_URL,
                component: DocStatusListComponent
            },
            {
                path: ':id',
                component: DocStatusDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_USER_MESSAGES_URL,
        children: [
            {
                path: LIST_URL,
                component: UserMessageListComponent
            },
            {
                path: ':id',
                component: UserMessageDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_USER_RECEIVED_MESSAGES_URL,
        children: [
            {
                path: LIST_URL,
                component: UserReceivedMessageListComponent
            },
            {
                path: ':id',
                component: UserReceivedMessageDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_USER_DOCUMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: UserDocumentListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: UserDocumentDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_WORKFLOW_INBOX_URL,
        component: WorkflowInboxListComponent
    },
    {
        path: ADMIN_WORKFLOW_CHART_URL,
        component: WorkflowChartComponent
    },
    {
        path: ADMIN_REPORT_RIGHTS_URL,
        component: ReportRightsComponent
    },
    {
        path: FURNITURE_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureStatusListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FurnitureStatusDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_DB_UPDATER_URL,
        component: DbUpdaterComponent
    },
    {
        path: ADMINISTRATION_REPORT_PRIVILEGE_URL,
        component: ReportPrivilegesComponent,
        canActivate: [loginGuard]
    },
    {
        path: ADMINISTRATION_PASS_ENCODING_URL,
        component: PassEncodingComponent,
        canActivate: [loginGuard]
    },
    {
        path: ADMINISTRATION_GLOBAL_VALIDATION_URL,
        component: GlobalValidationComponent,
        canActivate: [loginGuard]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

//export const lookupRoutes: Routes = [
//    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
//    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
//];
