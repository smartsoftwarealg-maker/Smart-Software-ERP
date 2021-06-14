import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule } from 'smart-shared';
import { FoodCategoriesListComponent } from './food-categories-list.component';
import { FoodCategoriesDetailComponent } from './food-categories-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { HttpClientModule } from '@angular/common/http';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';

const routes: Routes = [
    {
        path: '',
        component: FoodCategoriesListComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // not found
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
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/food-categories/', 'HTL_FC_');
    }
}
