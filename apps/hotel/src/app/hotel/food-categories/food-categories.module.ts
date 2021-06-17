import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {NavService} from '../../common/nav.service';

import {FoodCategoriesListComponent} from './food-categories-list.component';
import {FoodCategoriesDetailComponent} from './food-categories-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../common/material.module';
import {HttpClientModule} from '@angular/common/http';
import {PaginationModule} from '../../common/pagination/pagination.module';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';

const routes: Routes = [
    {
        path: '',
        component: FoodCategoriesListComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
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
        PaginationModule,
        LoadingSpinnerModule,
        FatalErrorModule,
        ListToolbarModule,
        SaveBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        FoodCategoriesListComponent,
        FoodCategoriesDetailComponent
    ],
    exports: [
        FoodCategoriesListComponent,
        FoodCategoriesDetailComponent
    ],
    entryComponents: [
        FoodCategoriesDetailComponent
    ]
})
export class FoodCategoriesModule {
    constructor(private navSrv: NavService,
                private langSrv: LanguageService) {
        const TAG = 'FoodCategoriesModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/food-categories/', 'HTL_FC_');
    }
}
