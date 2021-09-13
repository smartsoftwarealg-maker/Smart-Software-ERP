import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavService } from './common/nav.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogModule } from './common/confirmation-dialog/confirmation-dialog.module';
import { MAIN_PAGE_URL, LOGIN_URL } from './smart-lib/components/login/login-constants';
import { ThemeModule } from './smart-lib/components/theme/theme.module';
import { SmartCommonModule } from './smart-lib/common/smart-common.module';
import { LoadingSpinnerModule } from './smart-lib/components/loading-spinner/loading-spinner.module';
import { LanguageModule } from './smart-lib/components/language/language.module';
import { FatalErrorModule } from './smart-lib/components/fatal-error/fatal-error.module';
import { LoginModule } from './smart-lib/components/login/login.module';
import { CenterSelectModule } from './smart-lib/components/center-select/center-select.module';
import { CustomErrorHandler } from './smart-lib/components/error-handler/custom-error-handler';
import { ErrorHandlerModule } from './smart-lib/components/error-handler/error-handler.module';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from './smart-lib/components/material.module';

export interface Application {
    name: string;
    image: string;
    path: string;
    // todo: add access rights?
}

export const hotelApp: Application = {
    name: 'HOTEL',
    image: 'assets/img/app_hotel.png',
    path: 'hotel'
};

export const applications: Application[] = [
    hotelApp
];

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        redirectTo: hotelApp.path
    },
    {
        path: hotelApp.path,
        data: { title: hotelApp.name, entity: null, moduleName: 'HotelModule' },
        loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)
    },
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' }, // not found
];

@NgModule({
    declarations:
        [
            AppComponent
        ],
    imports:
        [
            // node_modules
            BrowserModule,
            BrowserAnimationsModule,
            MaterialModule,
            HttpClientModule,
            ConfirmationDialogModule,
            // smart-lib
            ThemeModule,
            SmartCommonModule,
            LoadingSpinnerModule,
            LanguageModule,
            FatalErrorModule,
            LoginModule,
            CenterSelectModule,
            ErrorHandlerModule,
            RouterModule.forRoot(routes, { enableTracing: false }),
        ],
    providers:
        [
            { provide: ErrorHandler, useClass: CustomErrorHandler },
            DeviceDetectorService
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private navSrv: NavService,
        private router: Router, private langSrv: LanguageService) {
        navSrv.init(routes, router);
        langSrv.addSource('assets/locale/', '');
    }
}
