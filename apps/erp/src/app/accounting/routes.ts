import {Routes} from '@angular/router';
import {AccountDetailComponent, AccountListComponent} from '@ss/logistics/ui-account';
import {ACC_POLICIES_URL, COMMON_ACCOUNT_URL} from '../common';
import { ABS_INDEX_URL, CanActivateService, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import {AccPoliciesComponent} from '@ss/accounting/acc-policies';

export const accRoutes: Routes = [
    {
        path: ACC_POLICIES_URL,
        component: AccPoliciesComponent,
        canActivate: [CanActivateService]
    },
    {
        path: COMMON_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AccountListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
]
