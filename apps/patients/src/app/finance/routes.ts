import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {PaymentsListComponent, PaymentsDetailComponent} from '@ss/logistics/payments';
import {LOGISTICS_PAYMENTS_URL} from '../common';

export const financeRoutes: Routes = [
    {
        path: LOGISTICS_PAYMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PaymentsListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                data: { agents: '/patients' }
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
