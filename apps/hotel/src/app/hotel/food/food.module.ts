import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { FoodListComponent } from './food-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { FoodService } from './food.service';
import { CanDeactivateService, FoodDetailComponent } from './food-detail.component';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { ImageInputModule } from '../../common/image-input/image-input.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { FatalErrorModule } from '../../smart-lib/components/fatal-error/fatal-error.module';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: FoodListComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: FoodDetailComponent,
        data: { entity: null },
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
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
        PaginationModule,
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
        private langSrv: LanguageService) {
        const TAG = 'FoodModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/food/', 'HTL_FOD_');
    }
}
