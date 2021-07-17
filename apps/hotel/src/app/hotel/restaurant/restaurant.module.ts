import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { RestaurantListComponent } from './restaurant-list.component';

import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { RestaurantService } from './restaurant.service';
import { CanDeactivateService, RestaurantDetailComponent } from './restaurant-detail.component';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { ImageInputModule } from '../../common/image-input/image-input.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { FatalErrorModule } from '../../smart-lib/components/fatal-error/fatal-error.module';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: RestaurantListComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: RestaurantDetailComponent,
        data: { entity: null },
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // not found
];


@NgModule({
    imports: [
        CommonModule,
        SmartCommonModule,
        MaterialModule,
        FatalErrorModule,
        LoadingSpinnerModule,
        ListToolbarModule,
        PaginationModule,
        AutoCompleteModule,
        ImageInputModule,
        RouterModule.forChild(routes),
        SaveBarModule
    ],
    declarations: [
        RestaurantListComponent,
        RestaurantDetailComponent,
    ],
    providers: [
        RestaurantService,
        CanDeactivateService,
    ]
})
export class RestaurantModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'RestaurantModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/restaurant/', 'HTL_RST_');
    }
}
