import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ShellComponent, UiShellModule } from '@ss/common/ui-shell';
import {
    AUTH_2FA_URL,
    CanActivateService,
    INDEX_PAGE_URL,
    LanguageService,
    LOGIN_URL, LoginService,
    LoginType,
    MAIN_PAGE_URL, UPDATE_PASSWORD_URL
} from '@ss/common/api-common';

import {EMPSPACE_APP_URL} from './common';
import {MainPageComponent} from '@ss/common/ui-main-page';
import { Auth2FAConfirmationComponent, PasswordUpdateComponent } from '@ss/auth-2fa';

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
                path: EMPSPACE_APP_URL,
                loadChildren: () => import('./empspace/emp-space.module').then(m => m.EmpSpaceModule)
            },
            { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
            { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
        ]
    },
    { path: UPDATE_PASSWORD_URL, component: PasswordUpdateComponent },
    { path: AUTH_2FA_URL, component: Auth2FAConfirmationComponent },
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
        // modules with routes
        UiLoginModule,
        UiCenterSelectModule,
    ],
    bootstrap: [AppComponent],
} */)
export class AppModule {
    constructor(private langSrv: LanguageService, private loginSrv: LoginService) {
        this.loginSrv.customerLogin = LoginType.PERSON;
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/common_', 'COMMON_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/att_', 'ATT_');
    }
}
