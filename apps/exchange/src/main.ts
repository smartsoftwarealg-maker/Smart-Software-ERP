import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { MAIN_PAGE_URL, INDEX_PAGE_URL, CanActivateService, LOGIN_URL } from '@ss/common/api-common';
import { ShellComponent, UiShellModule } from '@ss/common/ui-shell';
import { MainPageComponent } from '@ss/common/ui-main-page';
import { ADMINISTRATION_APP_URL, EXCHANGE_APP_URL } from './app/common';
import { UiThemeModule } from '@ss/common/ui-theme';
import { UiErrorHandlerModule } from '@ss/common/ui-error-handler';
import { CommonUiLangModule } from '@ss/common/ui-lang';
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
                path: ADMINISTRATION_APP_URL,
                loadChildren: () => import("./app/administration/administration.module").then(m => m.AdministrationModule)
            },
            {
                path: EXCHANGE_APP_URL,
                loadChildren: () => import("./app/exchange/exchange.module").then(m => m.ExchangeModule)
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
        UiThemeModule, UiErrorHandlerModule, UiShellModule, CommonUiLangModule, 
        // modules with routes
        UiLoginModule, UiCenterSelectModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
    ]
})
  .catch((err) => console.error(err));
