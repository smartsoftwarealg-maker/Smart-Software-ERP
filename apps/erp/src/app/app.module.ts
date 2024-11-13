import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiCenterSelectModule } from '@ss/common/ui-center-select';
import { UiThemeModule } from '@ss/common/ui-theme';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UiLoginModule } from '@ss/common/ui-login';
import { UiErrorHandlerModule } from '@ss/common/ui-error-handler';
import { ShellComponent } from '@ss/common/ui-shell';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AUTH_2FA_URL, LOGIN_URL, MAIN_PAGE_URL, UPDATE_PASSWORD_URL } from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {ColorPickerModule} from 'ngx-color-picker';
import {appRoutes} from '../environments/environment';
import { Auth2FAConfirmationComponent, PasswordUpdateComponent } from '@ss/auth-2fa';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot(routes, { enableTracing: false, bindToComponentInputs: true }),
        // Smart Software modules
        UiThemeModule,
        UiErrorHandlerModule,
        CommonUiLangModule,
        // modules with routes
        UiLoginModule,
        UiCenterSelectModule,
        ColorPickerModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
