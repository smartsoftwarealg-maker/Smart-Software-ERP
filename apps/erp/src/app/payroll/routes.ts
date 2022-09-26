import {
    COMMON_REPORTS_URL, DASHBOARD_URL, HR_EMPLOYEES_URL, HR_INACTIVE_EMPLOYEES_URL,
    LOOKUPS_URL,
    MISSION_PREPARATION_URL,
    MISSION_TRAJECTORIES,
    PAY_AMENDMENT_URL, PAY_ARCHIVE_GENERATOR,
    PAY_CACO_URL,
    PAY_DAS_URL,
    PAY_EDO_URL,
    PAY_ELEMENT_TYPES_URL,
    PAY_ELEMENTS_ENTRY_URL,
    PAY_ELEMENTSINFO_URL,
    PAY_FIXED_ELEMENTS_URL,
    PAY_FORMULAS_URL,
    PAY_INPUT_FILTERS,
    PAY_LOANS_URL,
    PAY_MONTH_CANCELER,
    PAY_MONTH_CLOSER,
    PAY_MONTH_SELECTOR,
    PAY_SALARY_GRID,
    PAY_SPECIAL_PAYROLL_URL,
    PAY_VACATION_PLANNING,
    PAY_XLS_INJECTION, PAYROLL_EMPLOYEES_URL
} from '../common';
import {
    ABS_INDEX_URL,
    CanActivateService,
    CanDeactivateService,
    LIST_URL,
    RedirectToParentComponent
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
import {MissionPreparationDetailComponent, MissionPreparationListComponent} from '@ss/hr-missions';
import {TrajectoryDetailComponent, TrajectoryListComponent} from '@ss/hr-missions/mission-trajectories';
import {SalaryGridDetailComponent, SalaryGridListComponent} from '@ss/payroll/salary-grid';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {
    EmployeeActivationDetailComponent,
    EmployeeCareerDetailComponent,
    EmployeeChildDetailComponent,
    EmployeeContractsDetailComponent,
    EmployeeDetailComponent,
    EmployeeDiplomaDetailComponent, EmployeeLanguagesDetailComponent,
    EmployeeListComponent, EmployeeOldCareerDetailComponent,
    EmployeeTrainingDetailComponent,
    EmployeeWifeDetailComponent,
    PunishmentDetailComponent
} from '@ss/payroll/ui-employee';
import {
    ACTIVATION_ROUTE_URL,
    CAREER_ROUTE_URL,
    CHILDREN_ROUTE_URL,
    CONTRACTS_ROUTE_URL,
    DIPLOMA_ROUTE_URL,
    LANGUAGES_ROUTE_URL, OLD_CAREER_ROUTE_URL,
    PUNISHMENT_ROUTE_URL,
    TRAINING_ROUTE_URL,
    WIVES_ROUTE_URL
} from '@ss/payroll/api-employee';
import {PayrollMonthGuard} from '@ss/payroll-common';
import {DashboardComponent} from '@ss/dashboard';
import {AppArchiveDetailComponent, AppArchiveListComponent} from '@ss/common/app-archive';

export const mainRoutes: Routes = [
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [CanActivateService],
    },
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./payroll-lookups.module').then(m => m.PayrollLookupsModule)
    },
    {
        path: PAY_EDO_URL,
        component: EdoComponent,
        canActivate: [CanActivateService]
    },
    {
        path: PAY_DAS_URL,
        component: DasComponent,
        canActivate: [CanActivateService, PayrollMonthGuard]
    },
    {
        path: PAY_CACO_URL,
        component: CacoComponent,
        canActivate: [CanActivateService, PayrollMonthGuard]
    },
    {
        path: PAY_ELEMENTSINFO_URL,
        children: [
            {
                path: LIST_URL,
                component: ElementsInfoComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ElementsInfoDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService, PayrollMonthGuard]
            },
            {
                path: ':id',
                component: SpecialPayrollDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: MISSION_PREPARATION_URL,
        children: [
            {
                path: LIST_URL,
                component: MissionPreparationListComponent,
                canActivate: [CanActivateService, PayrollMonthGuard]
            },
            {
                path: ':id',
                component: MissionPreparationDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService, PayrollMonthGuard]
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ElementTypesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAY_MONTH_CLOSER,
        component: MonthCloserComponent,
        canActivate: [CanActivateService, PayrollMonthGuard],
    },
    {
        path: PAY_XLS_INJECTION,
        component: ExcelInjectionComponent,
        canActivate: [CanActivateService, PayrollMonthGuard],
    },
    {
        path: PAY_MONTH_CANCELER,
        component: MonthCancelerComponent,
        canActivate: [CanActivateService, PayrollMonthGuard],
    },
    {
        path: PAY_ARCHIVE_GENERATOR,
        component: ArchiveGeneratorComponent,
        canActivate: [CanActivateService, PayrollMonthGuard],
    },
    {
        path: PAY_MONTH_SELECTOR,
        component: MonthSelectorComponent,
        canActivate: [CanActivateService],
    },
    {
        path: PAY_VACATION_PLANNING,
        children: [
            {
                path: LIST_URL,
                component: VacationPlanningListComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
            },
            {
                path: ':id',
                children: [
                    {
                        path: 'detail',
                        children: [
                            { path: ':id', component: VacationPlanningDetailDetailComponent, canActivate: [CanActivateService] }
                        ]
                    },
                    {
                        path: '',
                        component: VacationPlanningDetailComponent,
                        canActivate: [CanActivateService]
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
                canActivate: [CanActivateService, PayrollMonthGuard]
            },
            {
                path: ':id',
                component: FormulaDetailComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
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
                canActivate: [CanActivateService, PayrollMonthGuard],
            },
            {
                path: ':id',
                component: ElementsEntryDetailComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
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
                canActivate: [CanActivateService, PayrollMonthGuard],
            },
            {
                path: ':id',
                component: PayrollAmendmentDetailComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
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
                canActivate: [CanActivateService, PayrollMonthGuard],
            },
            {
                path: ':id',
                component: LoansDetailComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
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
                canActivate: [CanActivateService, PayrollMonthGuard]
            },
            {
                path: ':id',
                component: FixedElementsDetailComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
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
                canActivate: [CanActivateService, PayrollMonthGuard]
            },
            {
                path: ':id',
                component: InputFilterDetailComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SalaryGridDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: MISSION_TRAJECTORIES,
        children: [
            {
                path: LIST_URL,
                component: TrajectoryListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: TrajectoryDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'payroll'},
        component: ReportViewComponent,
        canActivate: [CanActivateService, PayrollMonthGuard]
    },
    {
        path: HR_INACTIVE_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
                data: { active: false }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: EmployeeDetailComponent,
                        canActivate: [CanActivateService, PayrollMonthGuard],
                        canDeactivate: [CanDeactivateService],
                        data: { hrMode: true, active: false },
                        children: [
                            { path: '', component: AppArchiveListComponent },
                            {
                                path: 'detail',
                                children: [
                                    {path: ':id', component: AppArchiveDetailComponent},
                                    {path: '**', redirectTo: '../' }
                                ]
                            }
                        ]
                    },
                    {
                        path: ACTIVATION_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeActivationDetailComponent,
                                canActivate: [CanActivateService, PayrollMonthGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: CAREER_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeCareerDetailComponent,
                                canActivate: [CanActivateService, PayrollMonthGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: CONTRACTS_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeContractsDetailComponent,
                                canActivate: [CanActivateService, PayrollMonthGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: WIVES_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeWifeDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: CHILDREN_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeChildDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: DIPLOMA_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeDiplomaDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: TRAINING_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeTrainingDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: PUNISHMENT_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: PunishmentDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: LANGUAGES_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeLanguagesDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: OLD_CAREER_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeOldCareerDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    {
        path: PAYROLL_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [CanActivateService, PayrollMonthGuard],
                data: { active: true }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: EmployeeDetailComponent,
                        canActivate: [CanActivateService, PayrollMonthGuard],
                        canDeactivate: [CanDeactivateService],
                        data: { hrMode: false, active: true },
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full' },
                                    {path: ':id', component: AppArchiveDetailComponent},
                                ]
                            }
                        ]
                    },
                    {
                        path: ACTIVATION_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeActivationDetailComponent,
                                canActivate: [CanActivateService, PayrollMonthGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: CAREER_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeCareerDetailComponent,
                                canActivate: [CanActivateService, PayrollMonthGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: CONTRACTS_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeContractsDetailComponent,
                                canActivate: [CanActivateService, PayrollMonthGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: WIVES_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeWifeDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: DIPLOMA_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeDiplomaDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: TRAINING_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: EmployeeTrainingDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: PUNISHMENT_ROUTE_URL,
                        children: [
                            {
                                path: '',
                                component: RedirectToParentComponent,
                            },
                            {
                                path: ':id',
                                component: PunishmentDetailComponent,
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
