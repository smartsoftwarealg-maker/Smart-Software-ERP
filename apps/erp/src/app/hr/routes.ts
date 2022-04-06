import {
    COMMON_REPORTS_URL,
    HR_CATEGORIES_URL,
    HR_DEPARTMENTS_URL,
    HR_DIPLOMAS_URL,
    HR_DIVISIONS_URL,
    HR_EDUCATION_LEVELS_URL,
    HR_EMPLOYEES_URL,
    HR_EMPLOYMENT_TYPE_URL, HR_INACTIVE_EMPLOYEES_URL,
    HR_MARITAL_STATUS_URL,
    HR_NATIONALITIES_URL,
    HR_POSTS_URL,
    HR_PROFESSIONAL_FAULT_URL,
    HR_PUNISHMENT_TYPE_URL,
    HR_SERVICES_URL,
    HR_SUSPENSION_REASON_URL,
    LOOKUPS_URL
} from '../common';
import {
    ABS_INDEX_URL,
    CanActivateService,
    CanDeactivateService,
    LIST_URL,
    RedirectToParentComponent
} from '@ss/common/api-common';
import { Routes } from '@angular/router';
import {
    CategoryDetailComponent,
    CategoryListComponent,
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
    MaritalStatusDetailComponent,
    MaritalStatusListComponent,
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
    EmployeeDecisionDetailComponent
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
import { Component } from '@angular/core';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./hr-lookups.module').then(m => m.HRLookupsModule)
    },
    {
        path: HR_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [CanActivateService],
                data: { active: true }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: EmployeeDetailComponent,
                        canActivate: [CanActivateService],
                        canDeactivate: [CanDeactivateService],
                        data: { hrMode: true, active: true }
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
                                canActivate: [CanActivateService],
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
                                canActivate: [CanActivateService],
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
                                canActivate: [CanActivateService],
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
        path: HR_INACTIVE_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [CanActivateService],
                data: { active: false }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: EmployeeDetailComponent,
                        canActivate: [CanActivateService],
                        canDeactivate: [CanDeactivateService],
                        data: { hrMode: true, active: false }
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
                                canActivate: [CanActivateService],
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
                                canActivate: [CanActivateService],
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
                                canActivate: [CanActivateService],
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
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [CanActivateService],
        data: { reportBase: 'hr' }
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [
    {
        path: HR_EMPLOYMENT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: EmploymentTypeListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: EmploymentTypeDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SuspensionReasonDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ServiceDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CategoryDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DiplomaDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ProfessionalFaultDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: PunishmentTypeDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: EducationLevelDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: MaritalStatusDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: PostDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: NationalityDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DepartmentDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DivisionDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
