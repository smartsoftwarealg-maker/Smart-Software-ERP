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
    HR_CONTRACT_MOTIVE_URL,
    HR_HOLIDAY_REQUEST_URL,
    COMMON_BLOOD_GROUPS_URL,
    ADMIN_REPORT_RIGHTS_URL,
    HR_WORK_STOPPAGE_URL,
    HR_ACTIVITY_URL,
    HR_PHYSICIAN_URL,
    HR_SPECIALTY_URL,
    HR_CAREER_MOTIVE_URL, HR_ID_UPDATE_URL
} from '../common';
import {
    ABS_INDEX_URL,
    CanDeactivateService,
    LIST_URL
} from '@ss/common/api-common';
import { Routes } from '@angular/router';
import {
    BloodGroupDetailComponent,
    BloodGroupListComponent,
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
    SuspensionReasonListComponent,
    CareerMotiveDetailComponent,
    CareerMotiveListComponent
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
    PersonListComponent,
    PunishmentListComponent,
    EmployeeTrainingListComponent,
    EmployeeDiplomaListComponent, IdUpdateComponent
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
import {
    AppArchiveDetailComponent,
    AppArchiveListComponent,
    EMPLOYEE_ARCHIVES
} from '@ss/common/app-archive';
import {loginGuard} from '../erp-guards';
import { HolidayRequestDetailComponent, HolidayRequestListComponent } from '@ss/attendance';
import {
    EmployeeActivationListComponent
} from '@ss/payroll/ui-employee';
import {
    EmployeeCareerListComponent
} from '@ss/payroll/ui-employee';
import {
    EmployeeOldCareerListComponent
} from '@ss/payroll/ui-employee';
import {
    EmployeeDecisionListComponent
} from '@ss/payroll/ui-employee';
import {
    EmployeeLanguagesListComponent
} from '@ss/payroll/ui-employee';
import {
    EmployeeChildrenListComponent
} from '@ss/payroll/ui-employee';
import {
    EmployeeWivesListComponent
} from '@ss/payroll/ui-employee';
import {
    EmployeeContractListComponent
} from '@ss/payroll/ui-employee';
import { ReportRightsComponent } from '@ss/administration/reports-rights';
import {
    ActivityDetailComponent,
    ActivityListComponent, PhysicianDetailComponent, PhysicianListComponent,
    WorkStoppageDetailComponent,
    WorkStoppageListComponent
} from '@ss/payroll/work-stoppage';
import {
    SpecialtyListComponent
} from '@ss/payroll/work-stoppage';
import {
    SpecialtyDetailComponent
} from '@ss/payroll/work-stoppage';

export const hrRoutes: Routes = [
    {
        path: COMMON_BLOOD_GROUPS_URL,
        children: [
            {
                path: LIST_URL,
                component: BloodGroupListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: BloodGroupDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
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
        path: HR_WORK_STOPPAGE_URL,
        children: [
            {
                path: LIST_URL,
                component: WorkStoppageListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: WorkStoppageDetailComponent,
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
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: EMPLOYEE_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: EMPLOYEE_ARCHIVES }, canDeactivate: [CanDeactivateService]},
                                ]
                            },
                            {
                                path: ACTIVATION_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeActivationListComponent, pathMatch: 'full'},
                                    { path: ':id', component: EmployeeActivationDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: CAREER_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeCareerListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeCareerDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: OLD_CAREER_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeOldCareerListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeOldCareerDetailComponent, canDeactivate: [CanDeactivateService] }
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
                                    { path: ':id', component: EmployeeWifeDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: CHILDREN_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeChildrenListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeChildDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: DIPLOMA_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeDiplomaListComponent, pathMatch: 'full'},
                                    { path: ':id', component: EmployeeDiplomaDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: TRAINING_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeTrainingListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeTrainingDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: PUNISHMENT_ROUTE_URL,
                                children: [
                                    { path: '', component: PunishmentListComponent, pathMatch: 'full' },
                                    { path: ':id', component: PunishmentDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: LANGUAGES_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeLanguagesListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeLanguagesDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: DECISION_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeDecisionListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeDecisionDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            }
                        ]
                    },
                ]
            },
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
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: EMPLOYEE_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: EMPLOYEE_ARCHIVES }, canDeactivate: [CanDeactivateService]},
                                ]
                            },
                            {
                                path: ACTIVATION_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeActivationListComponent, pathMatch: 'full'},
                                    { path: ':id', component: EmployeeActivationDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: CAREER_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeCareerListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeCareerDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: OLD_CAREER_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeOldCareerListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeOldCareerDetailComponent, canDeactivate: [CanDeactivateService] }
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
                                        path: ':id', component: EmployeeContractsDetailComponent, canDeactivate: [CanDeactivateService],
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
                                    { path: ':id', component: EmployeeWifeDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: CHILDREN_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeChildrenListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeChildDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: DIPLOMA_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeDiplomaListComponent, pathMatch: 'full'},
                                    { path: ':id', component: EmployeeDiplomaDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: TRAINING_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeTrainingListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeTrainingDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: PUNISHMENT_ROUTE_URL,
                                children: [
                                    { path: '', component: PunishmentListComponent, pathMatch: 'full' },
                                    { path: ':id', component: PunishmentDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: LANGUAGES_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeLanguagesListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeLanguagesDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            },
                            {
                                path: DECISION_ROUTE_URL,
                                children: [
                                    { path: '', component: EmployeeDecisionListComponent, pathMatch: 'full' },
                                    { path: ':id', component: EmployeeDecisionDetailComponent, canDeactivate: [CanDeactivateService] }
                                ]
                            }
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [loginGuard],
        data: { reportBase: 'hr' }
    },
    {
        path: ADMIN_REPORT_RIGHTS_URL,
        component: ReportRightsComponent,
        data: {reportBase: 'hr'},
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
        path: HR_CAREER_MOTIVE_URL,
        children: [
            {
                path: LIST_URL,
                component: CareerMotiveListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CareerMotiveDetailComponent,
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
    {
        path: HR_ACTIVITY_URL,
        children: [
            {
                path: LIST_URL,
                component: ActivityListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ActivityDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HR_PHYSICIAN_URL,
        children: [
            {
                path: LIST_URL,
                component: PhysicianListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PhysicianDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: HR_ID_UPDATE_URL, component: IdUpdateComponent, canActivate: [loginGuard] },
    {
        path: HR_SPECIALTY_URL,
        children: [
            {
                path: LIST_URL,
                component: SpecialtyListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SpecialtyDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

