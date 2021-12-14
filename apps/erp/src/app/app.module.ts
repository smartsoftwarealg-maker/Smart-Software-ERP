import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiCenterSelectModule } from '@ss/common/ui-center-select';
import { UiThemeModule } from '@ss/common/ui-theme';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UiLoginModule } from '@ss/common/ui-login';
import { HttpClientModule } from '@angular/common/http';
import { UiErrorHandlerModule } from '@ss/common/ui-error-handler';
import { ShellComponent, UiShellModule } from '@ss/common/ui-shell';
import {
    ADMINISTRATION_APP_URL, DASHBOARD_APP_URL, FINANCE_APP_URL,
    LOGISTICS_APP_URL,
    PAYROLL_APP_URL,
    PURCHASES_APP_URL,
    SALES_APP_URL,
    STOCK_APP_URL
} from './common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent, CommonUiMainPageModule } from '@ss/common/ui-main-page';
import {CanActivateService, INDEX_PAGE_URL, LanguageService, LOGIN_URL, MAIN_PAGE_URL} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';

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
                path: STOCK_APP_URL,
                loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
            },
            {
                path: SALES_APP_URL,
                loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
            },
            {
                path: ADMINISTRATION_APP_URL,
                loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
            },
            {
                path: PAYROLL_APP_URL,
                loadChildren: () => import('./payroll/payroll.module').then(m => m.PayrollModule)
            },
            {
                path: DASHBOARD_APP_URL,
                loadChildren: () => import('./dashboard/app-dashboard.module').then(m => m.AppDashboardModule)
            },
            {
                path: FINANCE_APP_URL,
                loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)
            },
            {
                path: PURCHASES_APP_URL,
                loadChildren: () => import('./purchases/purchases.module').then(m => m.PurchasesModule)
            },
            {
                path: LOGISTICS_APP_URL,
                loadChildren: () => import('./logistics-admin/logistics-admin.module').then(m => m.LogisticsAdminModule)
            },
            { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
            { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { enableTracing: false }),
        // Smart Software modules
        UiThemeModule,
        UiErrorHandlerModule,
        UiShellModule,
        CommonUiLangModule,
        CommonUiMainPageModule,
        // modules with routes
        UiLoginModule,
        UiCenterSelectModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(private langSrv: LanguageService) {
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/stock_', 'STOCK_');
        langSrv.addSource('assets/locale/payroll_', 'PAYROLL_');
        langSrv.addSource('assets/locale/common_', 'COMMON_');
        langSrv.addSource('assets/locale/sales_', 'SALES_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/purchases_', 'PURCHASES_');
        langSrv.addSource('assets/locale/bl_', 'BL_');
    }

}
