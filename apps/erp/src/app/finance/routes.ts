import {
    LOGISTICS_PAYMENTS_URL,
    LOGISTICS_COMPENSATION_URL,
    LOGISTICS_SPAYMENTS_URL,
    LOGISTICS_CPAYMENTS_URL, LOGISTICS_SCOMPENSATION_URL, LOGISTICS_CCOMPENSATION_URL, PAYMENT_ORDER
} from '../common';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {PaymentsListComponent, PaymentsDetailComponent} from '@ss/logistics/payments';
import {PaymentCompensationComponent} from '@ss/logistics/payment-compensation';
import {PaymentOrderDetailComponent, PaymentOrderListComponent} from '../../../../../libs/purchases/payment-orders/src';

export const financeRoutes: Routes = [
    {
        path: LOGISTICS_CCOMPENSATION_URL,
        component: PaymentCompensationComponent,
            data: { agents: '/customers' }
    },
    {
        path: LOGISTICS_SCOMPENSATION_URL,
        component: PaymentCompensationComponent,
        data: { agents: '/suppliers' }
    },
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
    {
        path: LOGISTICS_SPAYMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PaymentsListComponent,
                canActivate: [CanActivateService],
                data: { url: '/spayments', agents: '/customers' }
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                data: { url: '/spayments', agents: '/suppliers' }
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_CPAYMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PaymentsListComponent,
                canActivate: [CanActivateService],
                data: { url: '/cpayments', agents: '/customers' }
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                data: { url: '/cpayments', agents: '/customers' }
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYMENT_ORDER,
        children: [
            {
                path: LIST_URL,
                component: PaymentOrderListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: PaymentOrderDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
