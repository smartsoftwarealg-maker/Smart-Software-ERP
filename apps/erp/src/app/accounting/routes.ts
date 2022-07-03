import {Routes} from '@angular/router';
import {AccountDetailComponent, AccountListComponent} from '@ss/logistics/ui-account';
import {
    ACC_DEPRECIATION_GEN_URL,
    ACC_FILE_SELECTOR_URL, ACC_FILES_URL, ACC_GENERATION_URL,
    ACC_JOURNALS_URL, ACC_PERIOD_SELECTOR_URL,
    ACC_POLICIES_URL, ACC_PROJECTS_URL,
    ACC_TRANSACTIONS_URL, ASSET_ACCOUNT_URL, CASHFLOW_ACCOUNTS_URL,
    COMMON_ACCOUNT_URL, COMMON_REPORTS_URL, GENERATION_ACCOUNT_URL, TRANSAC_ACCOUNT_URL
} from '../common';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
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
    AccountingGenerationComponent
} from '@ss/accounting/transactions';
import {
    AssetAccountsListComponent,
    AssetAccountsDetailComponent,
    TransacAccountsListComponent,
    TransacAccountsDetailComponent,
    GenerationAccountsListComponent,
    GenerationAccountsDetailComponent, CashFlowListComponent, CashFlowDetailComponent
} from '@ss/accounting/accounting-accounts';
import {AccountingPeriodGuard} from '@ss/accounting/accounting-api';
import {ReportViewComponent} from '@ss/common/ui-report-param';

export const accRoutes: Routes = [
    {
        path: ACC_FILE_SELECTOR_URL,
        component: FileSelectorComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ACC_GENERATION_URL,
        component: AccountingGenerationComponent,
        canActivate: [CanActivateService, AccountingPeriodGuard]
    },
    {
        path: ACC_DEPRECIATION_GEN_URL,
        component: DepreciationGenerationComponent,
        canActivate: [CanActivateService, AccountingPeriodGuard]
    },
    {
        path: COMMON_REPORTS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'accounting'},
                component: ReportViewComponent,
                canActivate: [CanActivateService, AccountingPeriodGuard]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ACC_PERIOD_SELECTOR_URL,
        component: PeriodSelectorComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ACC_PERIOD_SELECTOR_URL,
        component: PeriodSelectorComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ACC_POLICIES_URL,
        component: AccPoliciesComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ASSET_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetAccountsListComponent,
                canActivate: [CanActivateService, AccountingPeriodGuard]
            },
            {
                path: ':id',
                component: AssetAccountsDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: TransacAccountsDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: GenerationAccountsDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService, AccountingPeriodGuard]
            },
            {
                path: ':id',
                component: CashFlowDetailComponent,
                canActivate: [CanActivateService, AccountingPeriodGuard],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccFileDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccProjectDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: JournalDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService, AccountingPeriodGuard],
                children: [
                    {
                        path: ':id',
                        children: [
                            {
                                path: '',
                                component: TransactionDetailComponent,
                            },
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
                ],
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
]
