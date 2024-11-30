import { NgModule } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { NavService } from './common/nav.service';
import { MAIN_PAGE_URL, LOGIN_URL } from './smart-lib/components/login/login-constants';
import { LanguageService } from '@ss/common/api-common';

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

@NgModule(/* TODO(standalone-migration): clean up removed NgModule class manually.
{
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
    LoadingSpinnerModule,
    LanguageModule,
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
} */)
export class AppModule {
    constructor(private navSrv: NavService,
        private router: Router, private langSrv: LanguageService) {
        navSrv.init(routes, router);
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/common_', 'COMMON_');
    }
}
