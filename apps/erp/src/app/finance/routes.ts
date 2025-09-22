import {
    LOGISTICS_PAYMENTS_URL,
    LOGISTICS_COMPENSATION_URL,
    LOGISTICS_SPAYMENTS_URL,
    LOGISTICS_CPAYMENTS_URL,
    LOGISTICS_SCOMPENSATION_URL,
    LOGISTICS_CCOMPENSATION_URL,
    PAYMENT_ORDER,
    DASHBOARD_URL,
    COMMON_REPORTS_URL, LOGISTICS_ADVANCEMENTS_URL
} from '../common';
import {ABS_INDEX_URL, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    PaymentsListComponent,
    PaymentsDetailComponent,
    AdvancementsListComponent,
    AdvancementsDetailComponent
} from '@ss/logistics/payments';
import {PaymentCompensationComponent} from '@ss/logistics/payment-compensation';
import {PaymentOrderDetailComponent, PaymentOrderListComponent} from '@ss/purchases/payment-orders';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {loginGuard} from '../erp-guards';

export const financeRoutes: Routes = [
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOGISTICS_ADVANCEMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: AdvancementsListComponent,
                canActivate: [loginGuard],
                data: { url: '/spayments', agents: '/suppliers' }
            },
            {
                path: ':id',
                component: AdvancementsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: { url: '/spayments', agents: '/suppliers' }
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
                canActivate: [loginGuard],
                data: { url: '/spayments', agents: '/suppliers' }
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard],
                data: { url: '/cpayments', agents: '/customers' }
            },
            {
                path: ':id',
                component: PaymentsDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PaymentOrderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'finance'},
                component: ReportViewComponent,
                canActivate: [loginGuard]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
