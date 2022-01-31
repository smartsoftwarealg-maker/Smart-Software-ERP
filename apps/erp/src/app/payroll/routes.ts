import {
    HR_POSTS_URL,
    LOOKUPS_URL,
    PAY_ELEMENT_TYPES_URL, PAY_ELEMENTS_ENTRY_URL,
    PAY_ELEMENTSINFO_URL, PAY_FIXED_ELEMENTS_URL,
    PAY_FORMULAS_URL, PAY_INPUT_FILTERS,
    PAY_MONTH_CANCELER,
    PAY_MONTH_CLOSER,
    PAY_MONTH_SELECTOR, PAY_VACATION_PLANNING, PAY_XLS_INJECTION
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
import {VacationPlanningListComponent} from '../../../../../libs/remuneration/vacation-planning/src';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./payroll-lookups.module').then(m => m.PayrollLookupsModule)
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
        component: VacationPlanningListComponent,
        canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ElementsEntryDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
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
