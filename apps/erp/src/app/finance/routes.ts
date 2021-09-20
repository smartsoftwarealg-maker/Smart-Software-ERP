import {LOGISTICS_PAYMENTS_URL, LOGISTICS_COMPENSATION_URL} from '../common';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {PaymentsListComponent, PaymentsDetailComponent} from '@ss/logistics/payments';
import {PaymentCompensationComponent} from '@ss/logistics/payment-compensation';

export const financeRoutes: Routes = [
    {
        path: LOGISTICS_COMPENSATION_URL,
        component: PaymentCompensationComponent
    },
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
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
