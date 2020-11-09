import {ADMINISTRATION_BANK_URL, ADMINISTRATION_COMPANY_URL, LOOKUPS_URL,} from '../constants';
import {ABS_INDEX_URL, CanActivateService, DETAIL_URL, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {BankDetailComponent, BankListComponent} from "@ss/administration/ui-bank";
import {
    CenterDetailComponent,
    CompanyCenterTreeComponent,
    CompanyDetailComponent
} from "../../../../../libs/administration/ui-company-center/src";


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
        path: ADMINISTRATION_COMPANY_URL,
        children: [
            {
                path: LIST_URL,
                component: CompanyCenterTreeComponent,
                canActivate: [CanActivateService],
            },
            {
                path: `company-${DETAIL_URL}`,
                component: CompanyDetailComponent,
                canActivate: [CanActivateService]
            },
            {
                path: `center-${DETAIL_URL}`,
                component: CenterDetailComponent,
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
