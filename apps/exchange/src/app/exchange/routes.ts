import {
    EXCHANGE_AGENT_URL,
    EXCHANGE_EXCHANGE_URL,
    EXCHANGE_BALANCE_URL,
    EXCHANGE_CURRENCY_URL,
    EXCHANGE_DEPOSIT_TYPE_URL,
    EXCHANGE_DEPOSIT_URL,
    EXCHANGE_HISTORY_URL,
    LOOKUPS_URL,
    EXCHANGE_CBALANCE_URL,
    EXCHANGE_COMMISSION_URL,
    EXCHANGE_COMMISSIONS_URL,
    EXCHANGE_GLOBAL_BALANCE_URL,
    COMMON_REPORT_PARAMS_URL, EXCHANGE_TRANSFER_URL
} from '../common';
import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {MiniAgentDetailComponent, AgentListComponent} from '@ss/logistics/ui-agent';
import {CurrencyDetailComponent, CurrencyListComponent} from '@ss/logistics/ui-currency';
import {
    CashCommissionDetailComponent,
    CashCommissionListComponent, CurrencyTransferDetailComponent, CurrencyTransferListComponent,
    DepositDetailComponent,
    DepositListComponent
} from '@ss/exchange/ui-currency-deposit';
import {DepositTypeDetailComponent, DepositTypeListComponent} from '@ss/exchange/ui-deposit-type';
import {
    BalanceComponent,
    CbalanceComponent,
    CommissionComponent,
    GlobalBalanceComponent,
    HistoryComponent
} from '@ss/exchange/ui-info';
import {ExchangeDetailComponent, ExchangeListComponent} from '@ss/exchange/ui-currency-exchange';
import {ReportViewComponent} from '@ss/common/ui-report-param';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./exchange-lookups.module').then(m => m.ExchangeLookupsModule)
    },
    {
        path: EXCHANGE_EXCHANGE_URL,
        children: [
            {
                path: LIST_URL,
                component: ExchangeListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ExchangeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },

    {
        path: EXCHANGE_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: MiniAgentDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: EXCHANGE_CURRENCY_URL,
        children: [
            {
                path: LIST_URL,
                component: CurrencyListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CurrencyDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORT_PARAMS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'exchange', app: 'exchange' },
                component: ReportViewComponent,
                canActivate: [CanActivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: EXCHANGE_DEPOSIT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: DepositTypeListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DepositTypeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: EXCHANGE_GLOBAL_BALANCE_URL,
        component: GlobalBalanceComponent
    },
    {
        path: EXCHANGE_DEPOSIT_URL,
        children: [
            {
                path: LIST_URL,
                component: DepositListComponent,
                children: [
                    { path: EXCHANGE_HISTORY_URL, component: HistoryComponent },
                    { path: EXCHANGE_BALANCE_URL, component: BalanceComponent },
                    { path: EXCHANGE_CBALANCE_URL, component: CbalanceComponent },
                    { path: EXCHANGE_COMMISSIONS_URL, component: CommissionComponent },
                ],
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DepositDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: EXCHANGE_HISTORY_URL, component: HistoryComponent },
                    { path: EXCHANGE_BALANCE_URL, component: BalanceComponent },
                    { path: EXCHANGE_CBALANCE_URL, component: CbalanceComponent },
                    { path: EXCHANGE_COMMISSIONS_URL, component: CommissionComponent },
                ]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: EXCHANGE_COMMISSION_URL,
        children: [
            {
                path: LIST_URL,
                component: CashCommissionListComponent,
                children: [
                    { path: EXCHANGE_HISTORY_URL, component: HistoryComponent },
                    { path: EXCHANGE_BALANCE_URL, component: BalanceComponent },
                    { path: EXCHANGE_CBALANCE_URL, component: CbalanceComponent },
                    { path: EXCHANGE_COMMISSIONS_URL, component: CommissionComponent },
                ],
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CashCommissionDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: EXCHANGE_HISTORY_URL, component: HistoryComponent },
                    { path: EXCHANGE_BALANCE_URL, component: BalanceComponent },
                    { path: EXCHANGE_CBALANCE_URL, component: CbalanceComponent },
                    { path: EXCHANGE_COMMISSIONS_URL, component: CommissionComponent },
                ]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: EXCHANGE_TRANSFER_URL,
        children: [
            {
                path: LIST_URL,
                component: CurrencyTransferListComponent,
                children: [
                    { path: EXCHANGE_HISTORY_URL, component: HistoryComponent },
                    { path: EXCHANGE_BALANCE_URL, component: BalanceComponent },
                    { path: EXCHANGE_CBALANCE_URL, component: CbalanceComponent },
                    { path: EXCHANGE_COMMISSIONS_URL, component: CommissionComponent },
                ],
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CurrencyTransferDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: EXCHANGE_HISTORY_URL, component: HistoryComponent },
                    { path: EXCHANGE_BALANCE_URL, component: BalanceComponent },
                    { path: EXCHANGE_CBALANCE_URL, component: CbalanceComponent },
                    { path: EXCHANGE_COMMISSIONS_URL, component: CommissionComponent },
                ]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
