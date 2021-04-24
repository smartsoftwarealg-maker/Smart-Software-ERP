import {
    EXCHANGE_AGENT_URL,
    EXCHANGE_APP_URL,
    EXCHANGE_CURRENCY_URL, EXCHANGE_DEPOSIT_TYPE_URL,
    EXCHANGE_EXCHANGE_URL,
    LOOKUPS_URL
} from '../common';
import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {AgentDetailComponent, AgentListComponent} from '@ss/logistics/ui-agent';
import {CurrencyDetailComponent, CurrencyListComponent} from '@ss/logistics/ui-currency';
import {ExchangeDetailComponent, ExchangeListComponent} from '@ss/exchange/ui-currency-exchange';
import {DepositTypeDetailComponent, DepositTypeListComponent} from "@ss/exchange/ui-deposit-type";

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./exchange-lookups.module').then(m => m.ExchangeLookupsModule)
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
                component: AgentDetailComponent,
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
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
