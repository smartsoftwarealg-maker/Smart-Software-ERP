import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {NavService} from '../../common/nav.service';
import {VersionService} from '../../common/version.service';
import {BookingCostsComponent} from './booking-costs.component';

const routes: Routes = [
    {
        path: '',
        component: BookingCostsComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}, // not found
];


@NgModule({
    imports: [
        CommonModule,
        SmartCommonModule,
        FatalErrorModule,
        LoadingSpinnerModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        BookingCostsComponent
    ],
    exports: [
        BookingCostsComponent
    ]
})
export class BookingCostsModule {
    constructor(private navSrv: NavService,
                private verSrv: VersionService,
                private langSrv: LanguageService) {
        const TAG = 'BookingCostsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/booking-costs/', 'HTL_BCT_');
    }
}
