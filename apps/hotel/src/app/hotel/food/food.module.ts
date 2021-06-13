import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {NavService} from '../../common/nav.service';
import {FoodListComponent} from './food-list.component';
import {VersionService} from '../../common/version.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../common/material.module';
import {HttpClientModule} from '@angular/common/http';
import {PaginationModel} from '@ss/common/ui-pagination';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';
import {FoodService} from './food.service';
import {CanDeactivateService, FoodDetailComponent} from './food-detail.component';
import {AutoCompleteModule} from '../../common/auto-complete/auto-complete.module';
import {ImageInputModule} from '../../common/image-input/image-input.module';

const routes: Routes = [
    {
        path: '',
        component: FoodListComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: FoodDetailComponent,
        data: {entity: null},
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}, // not found
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        SmartCommonModule,
        UiPaginationModule,
        LoadingSpinnerModule,
        FatalErrorModule,
        ListToolbarModule,
        SaveBarModule,
        RouterModule.forChild(routes),
        AutoCompleteModule,
        ImageInputModule
    ],
    declarations: [
        FoodListComponent,
        FoodDetailComponent
    ],
    providers: [
        FoodService,
        CanDeactivateService
    ]
})
export class FoodModule {
    constructor(private navSrv: NavService,
                private verSrv: VersionService,
                private langSrv: LanguageService) {
        const TAG = 'FoodModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/food/', 'HTL_FOD_');
    }
}
