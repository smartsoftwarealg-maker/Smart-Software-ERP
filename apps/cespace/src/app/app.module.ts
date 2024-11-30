import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';

import {
    CanActivateService,
    INDEX_PAGE_URL,
    LanguageService,
    LOGIN_URL,
    LoginService,
    LoginType,
    MAIN_PAGE_URL
} from '@ss/common/api-common';
import {ShellComponent, UiShellModule} from '@ss/common/ui-shell';
import {EXCHANGE_APP_URL} from './common';
import { MainPageComponent} from "@ss/common/ui-main-page";

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
                path: EXCHANGE_APP_URL,
                loadChildren: () => import('./exchange/cespace.module').then(m => m.CespaceModule)
            },
            { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
            { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' }
];

@NgModule(/* TODO(standalone-migration): clean up removed NgModule class manually.
{
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
        PaginationComponent,

        ExchangeUiIdiotPageModule,
        // modules with routes
        UiLoginModule,
        UiCenterSelectModule
    ],
    bootstrap: [AppComponent],
} */)
export class AppModule {

    constructor(private langSrv: LanguageService,
                private loginSrv: LoginService) {
        this.loginSrv.customerLogin = LoginType.BOTH;
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/common_', 'COMMON_');
        langSrv.addSource('assets/locale/exchange_', 'EXCHANGE_');
    }

}
