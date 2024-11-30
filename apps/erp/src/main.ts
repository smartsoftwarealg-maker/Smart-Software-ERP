import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment, appRoutes } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { MAIN_PAGE_URL, UPDATE_PASSWORD_URL, AUTH_2FA_URL, LOGIN_URL } from '@ss/common/api-common';
import { ShellComponent } from '@ss/common/ui-shell';
import { PasswordUpdateComponent, Auth2FAConfirmationComponent } from '@ss/auth-2fa';
import { UiThemeModule } from '@ss/common/ui-theme';
import { UiErrorHandlerModule } from '@ss/common/ui-error-handler';
import { UiLoginModule } from '@ss/common/ui-login';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        component: ShellComponent,
        children: appRoutes
    },
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
        importProvidersFrom(BrowserModule, MatProgressSpinnerModule,
        // Smart Software modules
        UiThemeModule, UiErrorHandlerModule,
        // modules with routes
        UiLoginModule, ColorPickerModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withComponentInputBinding()),
    ]
})
    .catch((err) => {
        console.error('main.ts (line 13): ', err);
    });
