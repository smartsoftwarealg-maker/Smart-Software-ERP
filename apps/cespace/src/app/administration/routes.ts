import {
    ADMINISTRATION_ACCCESSRIGHTS_URL,
    ADMINISTRATION_BANK_URL,
    ADMINISTRATION_CENTER_URL,
    ADMINISTRATION_CITY_URL,
    ADMINISTRATION_COMPANY_URL,
    ADMINISTRATION_COUNTRY_URL,
    ADMINISTRATION_REPORT_CATALOG_URL,
    ADMINISTRATION_ROLE_URL,
    ADMINISTRATION_SMTP_URL, ADMINISTRATION_TRACEABILITY_URL,
    ADMINISTRATION_USER_URL,
    ADMINISTRATION_WILAYA_URL,
} from '../common';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {BankDetailComponent, BankListComponent} from '@ss/administration/ui-bank';
import {CompanyDetailComponent, CompanyListComponent} from '@ss/administration/ui-company';
import {CenterDetailComponent, CenterListComponent} from '@ss/administration/ui-center';
import {SmtpDetailComponent, SmtpListComponent} from '@ss/administration/ui-smtp';
import {ReportCatalogDetailComponent, ReportCatalogListComponent} from '@ss/administration/ui-report-catalog';
import {UserDetailComponent, UserListComponent} from '@ss/administration/ui-user';
import {
    CityDetailComponent,
    CityListComponent,
    CountryDetailComponent,
    CountryListComponent,
    RoleDetailComponent,
    RoleListComponent,
    WilayaDetailComponent,
    WilayaListComponent
} from '@ss/common/ui-lookup';
import {AccessRightsListComponent} from "@ss/common/ui-access-rights";
import {TraceabilityComponent} from "@ss/common/ui-traceability";

export const mainRoutes: Routes = [];

//export const lookupRoutes: Routes = [
//    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
//    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
//];
