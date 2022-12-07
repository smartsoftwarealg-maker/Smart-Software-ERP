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
    ASSET_END_TYPE_URL,
    FURNITURE_STATUS_URL,
    ADMIN_DARIRA_URL,
    LOGISTICS_WORKFLOW_URL,
    ADMIN_USER_MESSAGES_URL,
    ADMIN_USER_DOCUMENTS_URL,
    ADMIN_WORKFLOW_INBOX_URL,
} from '../common';
import { ABS_INDEX_URL, CanActivateService, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
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
    FurnitureStatusListComponent, FurnitureStatusDetailComponent, DairaListComponent, DairaDetailComponent
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
    UserMessageDetailComponent, UserDocumentListComponent, UserDocumentDetailComponent, WorkflowInboxListComponent
} from '@ss/workflow';

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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AttributesDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: BankDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
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
                component: AppArchiveDocumentListComponent
            },
            {
                path: ':id',
                component: AppArchiveDocumentDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CompanyDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ReportCatalogDetailComponent,
                canActivate: [CanActivateService],
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
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_DARIRA_URL,
        children: [
            {
                path: LIST_URL,
                component: DairaListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DairaDetailComponent,
                canActivate: [CanActivateService],
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
        path: LOGISTICS_WORKFLOW_URL,
        children: [
            {
                path: LIST_URL,
                component: DocStatusListComponent
            },
            {
                path: ':id',
                component: DocStatusDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
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
                component: UserDocumentListComponent
            },
            {
                path: ':id',
                component: UserDocumentDetailComponent,
                canActivate: [CanActivateService],
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
        path: FURNITURE_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureStatusListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: FurnitureStatusDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_DB_UPDATER_URL,
        component: DbUpdaterComponent
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

//export const lookupRoutes: Routes = [
//    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
//    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
//];
