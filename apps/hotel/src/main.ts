import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule, hotelApp, applications, Application } from './app/app.module';
import { environment } from './environments/environment';

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        redirectTo: hotelApp.path
    },
    {
        path: hotelApp.path,
        data: { title: hotelApp.name, entity: null, moduleName: 'HotelModule' },
        loadChildren: () => import("./app/hotel/hotel.module").then(m => m.HotelModule)
    },
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' }, // not found
];


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
        // node_modules
        BrowserModule, MaterialModule, ConfirmationDialogModule, 
        // smart-lib
        ThemeModule, LoadingSpinnerModule, LanguageModule, LoginModule, CenterSelectModule, ErrorHandlerModule),
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        DeviceDetectorService,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));


/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

import 'hammerjs';
import { CustomErrorHandler } from './app/smart-lib/components/error-handler/custom-error-handler';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MaterialModule } from './app/smart-lib/components/material.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { ConfirmationDialogModule } from './app/common/confirmation-dialog/confirmation-dialog.module';
import { ThemeModule } from './app/smart-lib/components/theme/theme.module';
import { LoadingSpinnerModule } from './app/smart-lib/components/loading-spinner/loading-spinner.module';
import { LanguageModule } from './app/smart-lib/components/language/language.module';
import { LoginModule } from './app/smart-lib/components/login/login.module';
import { CenterSelectModule } from './app/smart-lib/components/center-select/center-select.module';
import { ErrorHandlerModule } from './app/smart-lib/components/error-handler/error-handler.module';
import { provideRouter, Routes } from '@angular/router';
import { MAIN_PAGE_URL, LOGIN_URL } from './app/smart-lib/components/login/login-constants';
import { AppComponent } from './app/app.component';
