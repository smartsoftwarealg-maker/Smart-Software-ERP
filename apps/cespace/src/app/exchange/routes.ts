import {
    EXCHANGE_BALANCE_URL,
    EXCHANGE_DEPOSIT_URL,
    EXCHANGE_HISTORY_URL,
    EXCHANGE_CBALANCE_URL,
    EXCHANGE_COMMISSION_URL,
    EXCHANGE_COMMISSIONS_URL,
    COMMON_REPORT_PARAMS_URL, EXCHANGE_TRANSFER_URL, COMMON_CUSTOMER_PROFILE_URL
} from '../common';
import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    CashCommissionDetailComponent,
    CashCommissionListComponent, CurrencyTransferDetailComponent, CurrencyTransferListComponent,
    DepositDetailComponent,
    DepositListComponent
} from '@ss/exchange/ui-currency-deposit';
import {
    BalanceComponent,
    CbalanceComponent,
    CommissionComponent,
    GlobalBalanceComponent,
    HistoryComponent
} from '@ss/exchange/ui-info';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";
import {IdiotPageComponent} from "@ss/exchange/ui-idiot-page";
import {CustomerSessionService} from "../../../../../libs/common/api-common/src/lib/customer-session.service";

export const mainRoutes: Routes = [
    {
        path: 'idiot',
        component: IdiotPageComponent,
        canActivate: [CanActivateService],
    },
    {
        path: COMMON_CUSTOMER_PROFILE_URL,
        component: CustomerProfileComponent,
        canActivate: [CustomerSessionService, CanActivateService],
    },
    {
        path: COMMON_REPORT_PARAMS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'exchange' },
                component: ReportViewComponent,
                canActivate: [CanActivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
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
                canActivate: [CanActivateService],
                data: { form: "Deposit" }
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

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
