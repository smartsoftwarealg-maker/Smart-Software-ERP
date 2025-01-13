import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { environment, appRoutes } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { MAIN_PAGE_URL, UPDATE_PASSWORD_URL, AUTH_2FA_URL, LOGIN_URL, CENTER_SELECT_URL } from '@ss/common/api-common';
import { ShellComponent } from '@ss/common/ui-shell';
import { PasswordUpdateComponent, Auth2FAConfirmationComponent } from '@ss/auth-2fa';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponent } from '@ss/common/ui-login';
import { CenterSelectComponent } from '@ss/common/ui-center-select';
import { CustomErrorHandler } from '@ss/common/ui-error-handler';

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        component: ShellComponent,
        children: appRoutes
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
        importProvidersFrom(BrowserModule, MatProgressSpinnerModule,  ColorPickerModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withComponentInputBinding()),
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
}).catch((err) => {
        console.error('main.ts (line 45): ', err);
    });
