import {Routes} from '@angular/router';
import {AccountDetailComponent, AccountListComponent} from '@ss/logistics/ui-account';
import {
    ACC_BALANCE_QUERIES_URL,
    ACC_DEPRECIATION_GEN_URL,
    ACC_FILE_SELECTOR_URL, ACC_FILES_URL, ACC_GENERATION_URL,
    ACC_JOURNALS_URL, ACC_PERIOD_SELECTOR_URL,
    ACC_POLICIES_URL, ACC_PROJECTS_URL, ACC_REOPEN_URL,
    ACC_TRANSACTIONS_URL, ASSET_ACCOUNT_URL, CASHFLOW_ACCOUNTS_URL,
    COMMON_ACCOUNT_URL, COMMON_REPORTS_URL, GENERATION_ACCOUNT_URL, TRANSAC_ACCOUNT_URL
} from '../common';
import {ABS_INDEX_URL, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {AccPoliciesComponent} from '@ss/accounting/acc-policies';
import {JournalDetailComponent, JournalListComponent} from '@ss/accounting/accounting-journal';
import {
    FileSelectorComponent,
    PeriodSelectorComponent,
    TransactionDetailComponent,
    TransactionLinesDetailComponent,
    TransactionLinesListComponent,
    TransactionListComponent,
    AccFileListComponent,
    AccFileDetailComponent,
    DepreciationGenerationComponent,
    AccProjectListComponent,
    AccProjectDetailComponent,
    AccountingGenerationComponent,
    AccountingReopenComponent,
    CanCloseOpener,
    BalanceQueriesComponent
} from '@ss/accounting/transactions';
import {
    AssetAccountsListComponent,
    AssetAccountsDetailComponent,
    TransacAccountsListComponent,
    TransacAccountsDetailComponent,
    GenerationAccountsListComponent,
    GenerationAccountsDetailComponent,
    CashFlowListComponent,
    CashFlowDetailComponent
} from '@ss/accounting/accounting-accounts';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {accountingGuard, loginGuard} from '../erp-guards';
import {
    ACC_TRANSACTION_ARCHIVES,
    AppArchiveDetailComponent,
    AppArchiveListComponent
} from '@ss/common/app-archive';

export const accRoutes: Routes = [
    {
        path: ACC_FILE_SELECTOR_URL,
        component: FileSelectorComponent,
        canActivate: [loginGuard]
    },
    {
        path: ACC_GENERATION_URL,
        component: AccountingGenerationComponent,
        canActivate: [loginGuard, accountingGuard]
    },
    {
        path: ACC_DEPRECIATION_GEN_URL,
        component: DepreciationGenerationComponent,
        canActivate: [loginGuard, accountingGuard]
    },
    {
        path: ACC_REOPEN_URL,
        component: AccountingReopenComponent,
        canActivate: [loginGuard, accountingGuard],
        canDeactivate: [CanCloseOpener]
    },
    {
        path: COMMON_REPORTS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'accounting'},
                component: ReportViewComponent,
                canActivate: [loginGuard, accountingGuard]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ACC_PERIOD_SELECTOR_URL,
        component: PeriodSelectorComponent,
        canActivate: [loginGuard]
    },
    {
        path: ACC_PERIOD_SELECTOR_URL,
        component: PeriodSelectorComponent,
        canActivate: [loginGuard]
    },
    {
        path: ACC_POLICIES_URL,
        component: AccPoliciesComponent,
        canActivate: [loginGuard]
    },
    {
        path: ASSET_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetAccountsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetAccountsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: TRANSAC_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: TransacAccountsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: TransacAccountsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: GENERATION_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: GenerationAccountsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: GenerationAccountsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: CASHFLOW_ACCOUNTS_URL,
        children: [
            {
                path: LIST_URL,
                component: CashFlowListComponent,
                canActivate: [loginGuard, accountingGuard]
            },
            {
                path: ':id',
                component: CashFlowDetailComponent,
                canActivate: [loginGuard, accountingGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: COMMON_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AccountListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_FILES_URL,
        children: [
            {
                path: LIST_URL,
                component: AccFileListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AccFileDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_PROJECTS_URL,
        children: [
            {
                path: LIST_URL,
                component: AccProjectListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AccProjectDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_JOURNALS_URL,
        children: [
            {
                path: LIST_URL,
                component: JournalListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: JournalDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_TRANSACTIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: TransactionListComponent,
                canActivate: [loginGuard, accountingGuard],
                children: [
                    {
                        path: ':id',
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: ACC_TRANSACTION_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: ACC_TRANSACTION_ARCHIVES }},
                                ]
                            },
                            {
                                path: '',
                                component: TransactionDetailComponent,
                                canDeactivate: [CanDeactivateService],
                                children: [
                                    { path: '', redirectTo: 'detail', pathMatch: 'full'},
                                    {
                                        path: 'detail',
                                        children: [
                                            {
                                                path: ':id',
                                                component: TransactionLinesDetailComponent,
                                            },
                                            {
                                                path: '',
                                                component: TransactionLinesListComponent,
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ],
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_BALANCE_QUERIES_URL,
        component: BalanceQueriesComponent,
        canActivate: [loginGuard, accountingGuard]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
