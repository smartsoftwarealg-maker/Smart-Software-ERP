import {
    COMMON_REPORTS_URL,
    HR_CATEGORIES_URL,
    HR_DEPARTMENTS_URL,
    HR_DIPLOMAS_URL,
    HR_DIVISIONS_URL,
    HR_EDUCATION_LEVELS_URL,
    HR_EMPLOYEES_URL,
    HR_EMPLOYMENT_TYPE_URL,
    HR_INACTIVE_EMPLOYEES_URL,
    HR_MARITAL_STATUS_URL,
    HR_NATIONALITIES_URL,
    HR_POSTS_URL,
    HR_PROFESSIONAL_FAULT_URL,
    HR_PUNISHMENT_TYPE_URL,
    HR_SERVICES_URL,
    HR_SUSPENSION_REASON_URL,
    HR_PERSON_LIST_URL,
    DASHBOARD_URL,
    HR_JUDICIAL_FRAMES_URL,
    HR_DECISION_MOTIVE_URL,
    HR_MOTIVE_URL,
    HR_CONTRACT_MOTIVE_URL, HR_HOLIDAY_REQUEST_URL
} from '../common';
import {
    ABS_INDEX_URL,
    CanDeactivateService,
    LIST_URL,
    RedirectToParentComponent
} from '@ss/common/api-common';
import { Routes } from '@angular/router';
import {
    CategoryDetailComponent,
    CategoryListComponent, ContractMotiveDetailComponent,
    ContractMotiveListComponent,
    DecisionMotiveDetailComponent,
    DecisionMotiveListComponent,
    DepartmentDetailComponent,
    DepartmentListComponent,
    DiplomaDetailComponent,
    DiplomaListComponent,
    DivisionDetailComponent,
    DivisionListComponent,
    EducationLevelDetailComponent,
    EducationLevelListComponent,
    EmploymentTypeDetailComponent,
    EmploymentTypeListComponent,
    JudicialFrameDetailComponent,
    JudicialFrameListComponent,
    MaritalStatusDetailComponent,
    MaritalStatusListComponent,
    MotiveDetailComponent,
    MotiveListComponent,
    NationalityDetailComponent,
    NationalityListComponent,
    PostDetailComponent,
    PostListComponent,
    ProfessionalFaultDetailComponent,
    ProfessionalFaultListComponent,
    PunishmentTypeDetailComponent,
    PunishmentTypeListComponent,
    ServiceDetailComponent,
    ServiceListComponent,
    SuspensionReasonDetailComponent,
    SuspensionReasonListComponent
} from '@ss/common/ui-lookup';
import {
    EmployeeActivationDetailComponent,
    EmployeeCareerDetailComponent,
    EmployeeContractsDetailComponent,
    EmployeeDetailComponent,
    EmployeeDiplomaDetailComponent,
    EmployeeListComponent,
    EmployeeTrainingDetailComponent,
    EmployeeWifeDetailComponent,
    EmployeeChildDetailComponent,
    PunishmentDetailComponent,
    EmployeeLanguagesDetailComponent,
    EmployeeOldCareerDetailComponent,
    EmployeeDecisionDetailComponent,
    PersonListComponent
} from '@ss/payroll/ui-employee';
import {
    ACTIVATION_ROUTE_URL,
    CAREER_ROUTE_URL,
    CONTRACTS_ROUTE_URL,
    DIPLOMA_ROUTE_URL,
    PUNISHMENT_ROUTE_URL,
    TRAINING_ROUTE_URL,
    WIVES_ROUTE_URL,
    CHILDREN_ROUTE_URL,
    LANGUAGES_ROUTE_URL,
    OLD_CAREER_ROUTE_URL,
    DECISION_ROUTE_URL
} from '@ss/payroll/api-employee';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import {DashboardComponent} from '@ss/dashboard';
import {AppArchiveDetailComponent, AppArchiveListComponent, AppArchiveMainComponent} from '@ss/common/app-archive';
import {loginGuard} from '../erp-guards';
import { HolidayRequestDetailComponent, HolidayRequestListComponent } from '@ss/attendance';

export const hrRoutes: Routes = [
    {
        path: HR_MOTIVE_URL,
        children: [
            {
                path: LIST_URL,
                component: MotiveListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: MotiveDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_DECISION_MOTIVE_URL,
        children: [
            {
                path: LIST_URL,
                component: DecisionMotiveListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DecisionMotiveDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_CONTRACT_MOTIVE_URL,
        children: [
            {
                path: LIST_URL,
                component: ContractMotiveListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ContractMotiveDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_JUDICIAL_FRAMES_URL,
        children: [
            {
                path: LIST_URL,
                component: JudicialFrameListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: JudicialFrameDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: HR_PERSON_LIST_URL,
        component: PersonListComponent,
        canActivate: [loginGuard],
    },
    {
        path: HR_EMPLOYEES_URL,
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
                        data: { hrMode: true, active: true },
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
                                canActivate: [loginGuard],
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    {
        path: HR_INACTIVE_EMPLOYEES_URL,
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
                        data: { hrMode: true, active: false },
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
                                canActivate: [loginGuard],
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
                                component: RedirectToParentComponent,
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
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [loginGuard],
        data: { reportBase: 'hr' }
    },
    {
        path: HR_EMPLOYMENT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: EmploymentTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: EmploymentTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_JUDICIAL_FRAMES_URL,
        children: [
            {
                path: LIST_URL,
                component: JudicialFrameListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: JudicialFrameDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_SUSPENSION_REASON_URL,
        children: [
            {
                path: LIST_URL,
                component: SuspensionReasonListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SuspensionReasonDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_SERVICES_URL,
        children: [
            {
                path: LIST_URL,
                component: ServiceListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ServiceDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_CATEGORIES_URL,
        children: [
            {
                path: LIST_URL,
                component: CategoryListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CategoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_DIPLOMAS_URL,
        children: [
            {
                path: LIST_URL,
                component: DiplomaListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DiplomaDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_PROFESSIONAL_FAULT_URL,
        children: [
            {
                path: LIST_URL,
                component: ProfessionalFaultListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ProfessionalFaultDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_PUNISHMENT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: PunishmentTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PunishmentTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_EDUCATION_LEVELS_URL,
        children: [
            {
                path: LIST_URL,
                component: EducationLevelListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: EducationLevelDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_MARITAL_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: MaritalStatusListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: MaritalStatusDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_POSTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PostListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PostDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_NATIONALITIES_URL,
        children: [
            {
                path: LIST_URL,
                component: NationalityListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: NationalityDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_DEPARTMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: DepartmentListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DepartmentDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_DIVISIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: DivisionListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DivisionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_HOLIDAY_REQUEST_URL,
        children: [
            {
                path: LIST_URL,
                component: HolidayRequestListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: HolidayRequestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

