import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule } from 'smart-shared';
import { RestaurantListComponent } from './restaurant-list.component';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from '@ss/common/api-common';
import { RestaurantService } from './restaurant.service';
import { CanDeactivateService, RestaurantDetailComponent } from './restaurant-detail.component';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { ImageInputModule } from '../../common/image-input/image-input.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';

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
        UiPaginationModule,
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
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/restaurant/', 'HTL_RST_');
    }
}
