import {
    enableProdMode,
    ErrorHandler,
    importProvidersFrom,
} from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
    withInterceptorsFromDi,
    provideHttpClient,
} from '@angular/common/http';
import {
    provideRouter,
    Routes,
    withComponentInputBinding,
} from '@angular/router';
import {
    MAIN_PAGE_URL,
    INDEX_PAGE_URL,
    CanActivateService,
    UPDATE_PASSWORD_URL,
    AUTH_2FA_URL,
    LOGIN_URL, CENTER_SELECT_URL
} from '@ss/common/api-common';
import { ShellComponent, UiShellModule } from '@ss/common/ui-shell';
import { MainPageComponent } from '@ss/common/ui-main-page';
import { EMPSPACE_APP_URL } from './app/common';
import {
    PasswordUpdateComponent,
    Auth2FAConfirmationComponent,
} from '@ss/auth-2fa';
import { CustomErrorHandler } from '@ss/common/ui-error-handler';

import { AppComponent } from './app/app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from '@ss/common/ui-login';
import { CenterSelectComponent } from '@ss/common/ui-center-select';

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        component: ShellComponent,
        children: [
            {
                path: INDEX_PAGE_URL,
                component: MainPageComponent,
                canActivate: [CanActivateService],
            },
            {
                path: EMPSPACE_APP_URL,
                loadChildren: () =>
                    import('./app/empspace/emp-space.module').then(
                        (m) => m.EmpSpaceModule,
                    ),
            },
            { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
            { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
        ],
    },
    { path: LOGIN_URL, component: LoginComponent },
    { path: CENTER_SELECT_URL, component: CenterSelectComponent },
    { path: UPDATE_PASSWORD_URL, component: PasswordUpdateComponent },
    { path: AUTH_2FA_URL, component: Auth2FAConfirmationComponent },
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' },
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
        { provide: ErrorHandler, useClass: CustomErrorHandler },
    ],
}).catch((err) => console.error('main.ts (line 55): ', err));
