import {
    HR_POSTS_URL,
    LOOKUPS_URL,
    PAY_ELEMENT_TYPES_URL,
    PAY_ELEMENTSINFO_URL,
    PAY_FORMULAS_URL,
    PAY_MONTH_CANCELER,
    PAY_MONTH_CLOSER,
    PAY_MONTH_SELECTOR
} from '../common';
import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import { Routes } from '@angular/router';
import {ElementsInfoComponent, ElementsInfoDetailComponent} from '@ss/remuneration/elementsinfo';
import {ElementTypesDetailComponent, ElementTypesListComponent} from '@ss/remuneration/element-types';
import {FormulaListComponent,FormulaDetailComponent} from '@ss/remuneration/payroll-formulas';
import {MonthCloserComponent, MonthCancelerComponent, MonthSelectorComponent} from '@ss/remuneration/payroll-month';

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
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
