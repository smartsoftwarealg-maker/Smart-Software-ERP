import {
    ADMIN_REPORT_RIGHTS_URL,
    ADMINISTRATION_REPORT_PRIVILEGE_URL,
    COMMON_REPORTS_URL,
    DASHBOARD_URL,
    LOOKUPS_URL,
    PAY_AMENDMENT_URL,
    PAY_ARCHIVE_GENERATOR,
    PAY_ARCHIVE_VIEWER_URL,
    PAY_CACO_URL,
    PAY_DAS_URL,
    PAY_EDO_URL,
    PAY_ELEMENT_TYPES_URL,
    PAY_ELEMENTS_ENTRY_URL,
    PAY_ELEMENTSINFO_URL,
    PAY_FIXED_ELEMENTS_URL,
    PAY_FORMULAS_URL,
    PAY_GRID_UPDATE_URL,
    PAY_INPUT_FILTERS,
    PAY_LOANS_URL,
    PAY_MONTH_CANCELER,
    PAY_MONTH_CLOSER,
    PAY_MONTH_SELECTOR,
    PAY_SALARY_GRID,
    PAY_SPECIAL_PAYROLL_URL,
    PAY_VACATION_PLANNING,
    PAY_XLS_INJECTION,
    PAYROLL_EMPLOYEES_URL,
    PAYROLL_INACTIVE_EMPLOYEES_URL
} from "../common";
import {
    ABS_INDEX_URL,
    CanDeactivateService,
    LIST_URL
} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {ElementsInfoComponent, ElementsInfoDetailComponent} from '@ss/remuneration/elementsinfo';
import {ElementTypesDetailComponent, ElementTypesListComponent} from '@ss/remuneration/element-types';
import {FormulaDetailComponent, FormulaListComponent} from '@ss/remuneration/payroll-formulas';
import {
    ArchiveGeneratorComponent,
    MonthCancelerComponent,
    MonthCloserComponent,
    MonthSelectorComponent
} from '@ss/remuneration/payroll-month';
import {
    ElementsEntryDetailComponent,
    ElementsEntryListComponent,
    FixedElementsDetailComponent,
    FixedElementsListComponent
} from '@ss/remuneration/elements-entry';
import {InputFilterDetailComponent, InputFilterListComponent} from '@ss/remuneration/input-filters';
import {ExcelInjectionComponent} from '@ss/remuneration/excel-injection';
import {
    VacationPlanningDetailComponent,
    VacationPlanningDetailDetailComponent,
    VacationPlanningListComponent
} from '@ss/remuneration/vacation-planning';
import {EdoComponent} from '@ss/remuneration/edo';
import {SpecialPayrollDetailComponent, SpecialPayrollListComponent} from '@ss/remuneration/special-payroll';
import {PayrollAmendmentDetailComponent, PayrollAmendmentListComponent} from '@ss/remuneration/payroll-amendment';
import {LoansDetailComponent, LoansListComponent} from '@ss/remuneration/loans';
import {DasComponent} from '@ss/remuneration/das';
import {CacoComponent} from '@ss/remuneration/caco';
import {
    SalaryGridDetailComponent,
    SalaryGridListComponent,
    SalaryGridUpdateComponent,
    SalaryRankListComponent
} from '@ss/payroll/salary-grid';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {
    EmployeeActivationDetailComponent,
    EmployeeActivationListComponent,
    EmployeeCareerDetailComponent,
    EmployeeCareerListComponent,
    EmployeeChildDetailComponent,
    EmployeeChildrenListComponent,
    EmployeeContractListComponent,
    EmployeeContractsDetailComponent, EmployeeDecisionDetailComponent, EmployeeDecisionListComponent,
    EmployeeDetailComponent,
    EmployeeDiplomaDetailComponent,
    EmployeeDiplomaListComponent,
    EmployeeLanguagesDetailComponent,
    EmployeeLanguagesListComponent,
    EmployeeListComponent,
    EmployeeOldCareerDetailComponent, EmployeeOldCareerListComponent,
    EmployeeTrainingDetailComponent,
    EmployeeTrainingListComponent,
    EmployeeWifeDetailComponent,
    EmployeeWivesListComponent,
    PunishmentDetailComponent,
    PunishmentListComponent
} from '@ss/payroll/ui-employee';
import {
    ACTIVATION_ROUTE_URL,
    CAREER_ROUTE_URL,
    CHILDREN_ROUTE_URL,
    CONTRACTS_ROUTE_URL, DECISION_ROUTE_URL,
    DIPLOMA_ROUTE_URL,
    LANGUAGES_ROUTE_URL, OLD_CAREER_ROUTE_URL,
    PUNISHMENT_ROUTE_URL,
    TRAINING_ROUTE_URL,
    WIVES_ROUTE_URL
} from '@ss/payroll/api-employee';
import {DashboardComponent} from '@ss/dashboard';
import {
    AGENT_ARCHIVES,
    AppArchiveDetailComponent,
    AppArchiveListComponent,
    EMPLOYEE_ARCHIVES
} from '@ss/common/app-archive';
import {ArchiveViewerListComponent} from '@ss/remuneration/archive-viewer';
import {loginGuard, payrollGuard} from '../erp-guards';
import { ReportRightsComponent } from '@ss/administration/reports-rights';
import { ReportPrivilegesComponent } from 'common/report-privileges';
import {
    SalaryRankDetailComponent
} from '@ss/payroll/salary-grid';

export const mainRoutes: Routes = [
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./payroll-lookups.module').then(m => m.PayrollLookupsModule)
    },
    {
        path: PAY_EDO_URL,
        component: EdoComponent,
        canActivate: [loginGuard]
    },
    {
        path: PAY_DAS_URL,
        component: DasComponent,
        canActivate: [loginGuard, payrollGuard]
    },
    {
        path: PAY_ARCHIVE_VIEWER_URL,
        component: ArchiveViewerListComponent,
        canActivate: [loginGuard, payrollGuard]
    },
    {
        path: PAY_CACO_URL,
        component: CacoComponent,
        canActivate: [loginGuard, payrollGuard]
    },
    {
        path: PAY_ELEMENTSINFO_URL,
        children: [
            {
                path: LIST_URL,
                component: ElementsInfoComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ElementsInfoDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_SPECIAL_PAYROLL_URL,
        children: [
            {
                path: LIST_URL,
                component: SpecialPayrollListComponent,
                canActivate: [loginGuard, payrollGuard]
            },
            {
                path: ':id',
                component: SpecialPayrollDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_ELEMENT_TYPES_URL,
        children: [
            {
                path: LIST_URL,
                component: ElementTypesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ElementTypesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_MONTH_CLOSER,
        component: MonthCloserComponent,
        canActivate: [loginGuard, payrollGuard],
    },
    {
        path: PAY_XLS_INJECTION,
        component: ExcelInjectionComponent,
        canActivate: [loginGuard, payrollGuard],
    },
    {
        path: PAY_MONTH_CANCELER,
        component: MonthCancelerComponent,
        canActivate: [loginGuard, payrollGuard],
    },
    {
        path: PAY_ARCHIVE_GENERATOR,
        component: ArchiveGeneratorComponent,
        canActivate: [loginGuard, payrollGuard],
    },
    {
        path: PAY_MONTH_SELECTOR,
        component: MonthSelectorComponent,
        canActivate: [loginGuard],
    },
    {
        path: PAY_VACATION_PLANNING,
        children: [
            {
                path: LIST_URL,
                component: VacationPlanningListComponent,
                canActivate: [loginGuard, payrollGuard],
            },
            {
                path: ':id',
                children: [
                    {
                        path: 'detail',
                        children: [
                            { path: ':id', component: VacationPlanningDetailDetailComponent, canActivate: [loginGuard] }
                        ]
                    },
                    {
                        path: '',
                        component: VacationPlanningDetailComponent,
                        canActivate: [loginGuard]
                    }
                ]
            }
        ]
    },
    {
        path: PAY_FORMULAS_URL,
        children: [
            {
                path: LIST_URL,
                component: FormulaListComponent,
                canActivate: [loginGuard, payrollGuard]
            },
            {
                path: ':id',
                component: FormulaDetailComponent,
                canActivate: [loginGuard, payrollGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_ELEMENTS_ENTRY_URL,
        children: [
            {
                path: LIST_URL,
                component: ElementsEntryListComponent,
                canActivate: [loginGuard, payrollGuard],
            },
            {
                path: ':id',
                component: ElementsEntryDetailComponent,
                canActivate: [loginGuard, payrollGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_AMENDMENT_URL,
        children: [
            {
                path: LIST_URL,
                component: PayrollAmendmentListComponent,
                canActivate: [loginGuard, payrollGuard],
            },
            {
                path: ':id',
                component: PayrollAmendmentDetailComponent,
                canActivate: [loginGuard, payrollGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_LOANS_URL,
        children: [
            {
                path: LIST_URL,
                component: LoansListComponent,
                canActivate: [loginGuard, payrollGuard],
            },
            {
                path: ':id',
                component: LoansDetailComponent,
                canActivate: [loginGuard, payrollGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_FIXED_ELEMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: FixedElementsListComponent,
                canActivate: [loginGuard, payrollGuard]
            },
            {
                path: ':id',
                component: FixedElementsDetailComponent,
                canActivate: [loginGuard, payrollGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_INPUT_FILTERS,
        children: [
            {
                path: LIST_URL,
                component: InputFilterListComponent,
                canActivate: [loginGuard, payrollGuard]
            },
            {
                path: ':id',
                component: InputFilterDetailComponent,
                canActivate: [loginGuard, payrollGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_SALARY_GRID,
        children: [
            {
                path: LIST_URL,
                component: SalaryGridListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SalaryGridDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    {
                        path: '', redirectTo: 'ranks', pathMatch: 'full'
                    },
                    {
                        path: 'ranks',
                        children: [
                            { path: '', component: SalaryRankListComponent, pathMatch: 'full'},
                            { path: ':id', component: SalaryRankDetailComponent }
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        data: {reportBase: 'payroll'},
        canActivate: [loginGuard, payrollGuard]
    },
    {
        path: PAY_GRID_UPDATE_URL,
        component: SalaryGridUpdateComponent,
        canActivate: [loginGuard, payrollGuard]
    },
    {
        path: ADMIN_REPORT_RIGHTS_URL,
        component: ReportRightsComponent,
        data: {reportBase: 'payroll'},
    },
    {
        path: PAYROLL_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [loginGuard],
                data: { active: true }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: EmployeeDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: { hrMode: false, active: true },
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: EMPLOYEE_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: EMPLOYEE_ARCHIVES }},
                                ]
                            },
                            {
                                path: ACTIVATION_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeActivationListComponent, pathMatch: 'full'},
                                    { path: ':id', component: EmployeeActivationDetailComponent }
                                ]
                            },
                            {
                                path: CAREER_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeCareerListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeCareerDetailComponent }
                                ]
                            },
                            {
                                path: OLD_CAREER_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeOldCareerListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeOldCareerDetailComponent }
                                ]
                            },
                            {
                                path: CONTRACTS_ROUTE_URL,
                                children: [
                                    {
                                        path: '',
                                        component: EmployeeContractListComponent,
                                        pathMatch: 'full'
                                    },
                                    {
                                        path: ':id', component: EmployeeContractsDetailComponent,
                                    }
                                ]
                            },
                            {
                                path: WIVES_ROUTE_URL,
                                children: [
                                    {
                                        path: '',
                                        component: EmployeeWivesListComponent,
                                        pathMatch: 'full'
                                    },
                                    { path: ':id', component: EmployeeWifeDetailComponent }
                                ]
                            },
                            {
                                path: CHILDREN_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeChildrenListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeChildDetailComponent }
                                ]
                            },
                            {
                                path: DIPLOMA_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeDiplomaListComponent, pathMatch: 'full'},
                                    { path: ':id', component: EmployeeDiplomaDetailComponent }
                                ]
                            },
                            {
                                path: TRAINING_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeTrainingListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeTrainingDetailComponent }
                                ]
                            },
                            {
                                path: PUNISHMENT_ROUTE_URL,
                                children: [
                                    { path: '', component: PunishmentListComponent, pathMatch: 'full' },
                                    { path: ':id', component: PunishmentDetailComponent }
                                ]
                            },
                            {
                                path: LANGUAGES_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeLanguagesListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeLanguagesDetailComponent }
                                ]
                            },
                            {
                                path: DECISION_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeDecisionListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeDecisionDetailComponent }
                                ]
                            }
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: PAYROLL_INACTIVE_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [loginGuard],
                data: { active: false }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: EmployeeDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: { hrMode: false, active: false },
                        children: [
                            {
                                path: ACTIVATION_ROUTE_URL,
                                children: [
                                    {
                                        path: '',
                                        component: EmployeeActivationListComponent,
                                    },
                                    {
                                        path: ':id',
                                        component: EmployeeActivationDetailComponent,
                                        canActivate: [loginGuard],
                                        canDeactivate: [CanDeactivateService]
                                    }
                                ]
                            },

                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: EMPLOYEE_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: EMPLOYEE_ARCHIVES }},
                                ]
                            }
                        ]
                    },
                    {
                        path: CAREER_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeCareerListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeCareerDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: CONTRACTS_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeContractListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeContractsDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: WIVES_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeWivesListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeWifeDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: CHILDREN_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeChildrenListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeChildDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: DIPLOMA_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeDiplomaListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeDiplomaDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: TRAINING_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeTrainingListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeTrainingDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: PUNISHMENT_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: PunishmentListComponent,
                            },
                            {
                                path: ':id',
                                component: PunishmentDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: LANGUAGES_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeLanguagesListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeLanguagesDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: OLD_CAREER_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeOldCareerListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeOldCareerDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: DECISION_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: EmployeeDecisionListComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeDecisionDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: ADMINISTRATION_REPORT_PRIVILEGE_URL,
        component: ReportPrivilegesComponent,
        data: {reportBase: 'payroll'},
        canActivate: [loginGuard]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
