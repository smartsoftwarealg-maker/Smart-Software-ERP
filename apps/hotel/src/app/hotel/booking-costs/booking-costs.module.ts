import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';

import { BookingCostsComponent } from './booking-costs.component';
import { LanguageService } from '@ss/common/api-common';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { FatalErrorModule } from '../../smart-lib/components/fatal-error/fatal-error.module';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';

const routes: Routes = [
    {
        path: '',
        component: BookingCostsComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // not found
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
        private langSrv: LanguageService) {
        const TAG = 'BookingCostsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/booking-costs/', 'HTL_BCT_');
    }
}
