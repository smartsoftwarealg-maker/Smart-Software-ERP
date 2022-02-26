import {
    HR_POSTS_URL,
    LOOKUPS_URL, PAY_AMENDMENT_URL, PAY_CACO_URL, PAY_DAS_URL, PAY_EDO_URL,
    PAY_ELEMENT_TYPES_URL, PAY_ELEMENTS_ENTRY_URL,
    PAY_ELEMENTSINFO_URL, PAY_FIXED_ELEMENTS_URL,
    PAY_FORMULAS_URL, PAY_INPUT_FILTERS, PAY_LOANS_URL,
    PAY_MONTH_CANCELER,
    PAY_MONTH_CLOSER,
    PAY_MONTH_SELECTOR, PAY_SPECIAL_PAYROLL_URL, PAY_VACATION_PLANNING, PAY_XLS_INJECTION
} from '../common';
import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import { Routes } from '@angular/router';
import {ElementsInfoComponent, ElementsInfoDetailComponent} from '@ss/remuneration/elementsinfo';
import {ElementTypesDetailComponent, ElementTypesListComponent} from '@ss/remuneration/element-types';
import {FormulaListComponent,FormulaDetailComponent} from '@ss/remuneration/payroll-formulas';
import {MonthCloserComponent, MonthCancelerComponent, MonthSelectorComponent} from '@ss/remuneration/payroll-month';
import {
    ElementsEntryDetailComponent,
    ElementsEntryListComponent, FixedElementsDetailComponent,
    FixedElementsListComponent
} from '@ss/remuneration/elements-entry';
import {InputFilterDetailComponent, InputFilterListComponent} from '@ss/remuneration/input-filters';
import {ExcelInjectionComponent} from '@ss/remuneration/excel-injection';
import {VacationPlanningDetailDetailComponent, VacationPlanningListComponent} from '@ss/remuneration/vacation-planning';
import {EdoComponent} from '@ss/remuneration/edo';
import {VacationPlanningDetailComponent} from '@ss/remuneration/vacation-planning';
import {
    SpecialPayrollDetailComponent,
    SpecialPayrollListComponent
} from '@ss/remuneration/special-payroll';
import {
    PayrollAmendmentDetailComponent,
    PayrollAmendmentListComponent
} from '@ss/remuneration/payroll-amendment';
import {LoansDetailComponent, LoansListComponent} from '@ss/remuneration/loans';
import {DasComponent} from '@ss/remuneration/das';
import {CacoComponent} from '@ss/remuneration/caco';

export const mainRoutes: Routes = [
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
        canActivate: [CanActivateService]
    },
    {
        path: PAY_CACO_URL,
        component: CacoComponent,
        canActivate: [CanActivateService]
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
                canActivate: [CanActivateService]
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
        canActivate: [CanActivateService],
    },
    {
        path: PAY_XLS_INJECTION,
        component: ExcelInjectionComponent,
        canActivate: [CanActivateService],
    },
    {
        path: PAY_MONTH_CANCELER,
        component: MonthCancelerComponent,
        canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: FormulaDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
            },
            {
                path: ':id',
                component: ElementsEntryDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
            },
            {
                path: ':id',
                component: PayrollAmendmentDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
            },
            {
                path: ':id',
                component: LoansDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: FixedElementsDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: InputFilterDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
