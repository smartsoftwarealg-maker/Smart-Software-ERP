import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
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
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/booking-costs/', 'HTL_BCT_');
    }
}
