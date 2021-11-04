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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent, CommonUiMainPageModule } from '@ss/common/ui-main-page';
import {
    CanActivateService,
    INDEX_PAGE_URL,
    LanguageService,
    LOGIN_URL, LoginService,
    LoginType,
    MAIN_PAGE_URL
} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {COMMON_CUSTOMER_PROFILE_URL, CSPACE_APP_URL} from "./common";
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";
import {ExchangeUiIdiotPageModule} from "@ss/exchange/ui-idiot-page";

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
                path: COMMON_CUSTOMER_PROFILE_URL,
                component: CustomerProfileComponent,
                canActivate: [CanActivateService]
            },
            {
               path: CSPACE_APP_URL,
               loadChildren: () => import('./cspace/cspace.module').then(m => m.CspaceModule)
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
        ExchangeUiIdiotPageModule,
        // modules with routes
        UiLoginModule,
        UiCenterSelectModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(private langSrv: LanguageService, private loginSrv: LoginService) {
        this.loginSrv.customerLogin = LoginType.BOTH;
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/common_', 'COMMON_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/common_', 'COMMON_');
    }
}
