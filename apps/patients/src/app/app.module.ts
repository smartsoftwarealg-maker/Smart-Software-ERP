import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ShellComponent, UiShellModule} from "@ss/common/ui-shell";
import { MainPageComponent} from "@ss/common/ui-main-page";
import {ADMINISTRATION_APP_URL, FINANCE_APP_URL, PATIENTS_APP_URL} from './common';
import {CanActivateService, INDEX_PAGE_URL, LanguageService, LOGIN_URL, MAIN_PAGE_URL} from "@ss/common/api-common";

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        component: ShellComponent,
        children: [
            {
                path: INDEX_PAGE_URL,
                component: MainPageComponent,
                canActivate: [CanActivateService]
            },
            {
                path: PATIENTS_APP_URL,
                loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)
            },
            {
                path: FINANCE_APP_URL,
                loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)
            },
            {
                path: ADMINISTRATION_APP_URL,
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
            },
            { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
            { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
        ]
    },
    {path: '', redirectTo: LOGIN_URL, pathMatch: 'full'},
    {path: '**', redirectTo: LOGIN_URL, pathMatch: 'full'}
]

@NgModule(/* TODO(standalone-migration): clean up removed NgModule class manually.
{
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { enableTracing: false }),
        // Smart Software modules
        UiThemeModule,
        UiErrorHandlerModule,
        UiShellModule,
        PaginationComponent,

        UiLoginModule,

        UiCenterSelectModule,
        LogisticsUiAgentModule
    ],
    providers: [],
    bootstrap: [AppComponent],
} */)
export class AppModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/common_', 'COMMON_');
        langSrv.addSource('assets/locale/patients_', 'PATIENTS_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/payroll_', 'PAYROLL_');
        langSrv.addSource('assets/locale/missions_', 'MISSIONS_');
        langSrv.addSource('assets/locale/bl_', 'BL_');
    }
}
