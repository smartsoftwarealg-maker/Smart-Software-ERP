import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withComponentInputBinding, withDebugTracing } from '@angular/router';
import {
    MAIN_PAGE_URL,
    INDEX_PAGE_URL,
    CanActivateService,
    LOGIN_URL,
    CENTER_SELECT_URL,
    UPDATE_PASSWORD_URL, AUTH_2FA_URL
} from '@ss/common/api-common';
import { ShellComponent } from '@ss/common/ui-shell';
import { MainPageComponent } from '@ss/common/ui-main-page';
import { CSPACE_APP_URL } from './app/common';
import { AppComponent } from './app/app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomErrorHandler } from '@ss/common/ui-error-handler';
import { LoginComponent } from '@ss/common/ui-login';
import { CenterSelectComponent } from '@ss/common/ui-center-select';
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
                path: CSPACE_APP_URL,
                loadChildren: () => import("./app/cspace/c-space.module").then(m => m.CSpaceModule)
            },
            { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
            { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
        ]
    },
    { path: LOGIN_URL, component: LoginComponent },
    { path: CENTER_SELECT_URL, component: CenterSelectComponent },
    { path: UPDATE_PASSWORD_URL, component: PasswordUpdateComponent },
    { path: AUTH_2FA_URL, component: Auth2FAConfirmationComponent },
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' }
];


if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatProgressSpinnerModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withComponentInputBinding()), //, withDebugTracing()
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
    .catch((err) => console.error('main.ts (line 55): ', err));
