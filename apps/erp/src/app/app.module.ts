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
    ADMINISTRATION_APP_URL,
    DASHBOARD_APP_URL,
    FINANCE_APP_URL,
    LOGISTICS_APP_URL,
    PAYROLL_APP_URL,
    HR_APP_URL,
    PURCHASES_APP_URL,
    SALES_APP_URL,
    STOCK_APP_URL,
    WEBARCH_APP_URL,
    ASSETS_APP_URL,
    ACCOUNTING_APP_URL,
    TREASURY_APP_URL,
    ORGANIZATIONS_APP_URL,
    SCHEDULED_SALES_APP_URL
} from './common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent, CommonUiMainPageModule } from '@ss/common/ui-main-page';
import {CanActivateService, INDEX_PAGE_URL, LanguageService, LOGIN_URL, MAIN_PAGE_URL} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {ColorPickerModule} from 'ngx-color-picker';
import {appRoutes} from '../environments/environment';

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        component: ShellComponent,
        children: appRoutes
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
        UiCenterSelectModule,
        ColorPickerModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
