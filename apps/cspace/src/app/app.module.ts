import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiCenterSelectModule } from '@ss/common/ui-center-select';
import { UiThemeModule } from '@ss/common/ui-theme';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UiLoginModule } from '@ss/common/ui-login';
import { UiErrorHandlerModule } from '@ss/common/ui-error-handler';
import { ShellComponent, UiShellModule } from '@ss/common/ui-shell';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from '@ss/common/ui-main-page';
import {
    CanActivateService,
    INDEX_PAGE_URL,
    LanguageService,
    LOGIN_URL, LoginService,
    LoginType,
    MAIN_PAGE_URL
} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CSPACE_APP_URL} from "./common";

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
               loadChildren: () => import('./cspace/c-space.module').then(m => m.CSpaceModule)
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
        RouterModule.forRoot(routes, { enableTracing: false }),
        // Smart Software modules
        UiThemeModule,
        UiErrorHandlerModule,
        CommonUiLangModule,
        // modules with routes
        UiLoginModule,
        UiCenterSelectModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
