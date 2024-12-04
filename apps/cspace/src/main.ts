import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { MAIN_PAGE_URL, INDEX_PAGE_URL, CanActivateService, LOGIN_URL } from '@ss/common/api-common';
import { ShellComponent } from '@ss/common/ui-shell';
import { MainPageComponent } from '@ss/common/ui-main-page';
import { CSPACE_APP_URL } from './app/common';
import { ThemeSelect } from '@ss/common/ui-theme';
import { UiErrorHandlerModule } from '@ss/common/ui-error-handler';

import { UiLoginModule } from '@ss/common/ui-login';
import { UiCenterSelectModule } from '@ss/common/ui-center-select';
import { AppComponent } from './app/app.component';

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
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' }
];


if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule,
        // Smart Software modules
        UiThemeModule, UiErrorHandlerModule,
        // modules with routes
        UiLoginModule, UiCenterSelectModule),
        provideAnimations(),
        provideRouter(routes),
    ]
})
    .catch((err) => console.error(err));
