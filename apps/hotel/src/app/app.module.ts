import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {MaterialModule} from './common/material.module';
import {
    ThemeModule,
    LoadingSpinnerModule,
    SmartCommonModule,
    LanguageModule,
    FatalErrorModule,
    CenterSelectModule,
    ErrorHandlerModule,
    CustomErrorHandler,
    CanActivateService,
    LoginModule,
    LanguageService,
    LOGIN_URL,
    MAIN_PAGE_URL,
} from 'smart-shared';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavService} from './common/nav.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmationDialogModule} from './common/confirmation-dialog/confirmation-dialog.module';

export interface Application {
    name: string;
    image: string;
    path: string;
    // todo: add access rights?
}

export const accountingApp: Application = {
    name: 'ACCOUNTING',
    image: '/assets/img/app_accounting.png',
    path: 'accounting'
};

export const payrollApp: Application = {
    name: 'PAYROLL',
    image: '/assets/img/app_payroll.png',
    path: 'payroll'
};

export const stockApp: Application = {
    name: 'STOCK',
    image: '/assets/img/app_stock.png',
    path: 'stock',
};

export const medicApp: Application = {
    name: 'MEDIC',
    image: '/assets/img/app_medic.png',
    path: 'medic',
};

export const hotelApp: Application = {
    name: 'HOTEL',
    image: '/assets/img/app_hotel.png',
    path: 'hotel'
};

export const applications: Application[] = [
    accountingApp,
    stockApp,
    payrollApp,
    hotelApp,
    medicApp
];

const routes: Routes = [
    {
        path: MAIN_PAGE_URL,
        data: {title: 'MAIN_MENU', entity: null, moduleName: 'IndexModule'},
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
        canActivate: [CanActivateService]
    },
    {
        path: hotelApp.path,
        data: {title: hotelApp.name, entity: null, moduleName: 'HotelModule'},
        loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)
    },
    {path: '', redirectTo: MAIN_PAGE_URL, pathMatch: 'full'},
    {path: '**', redirectTo: LOGIN_URL, pathMatch: 'full'}, // not found
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
            RouterModule.forRoot(routes, {enableTracing: false}),
        ],
    providers:
        [
            {provide: ErrorHandler, useClass: CustomErrorHandler},
            DeviceDetectorService
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private router: Router, private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/', '');
    }
}
