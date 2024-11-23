import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { FoyerArticlesListComponent } from './foyer-articles-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { ImageInputModule } from '../../common/image-input/image-input.module';
import { FoyerArticlesService } from './foyer-articles.service';
import { CanDeactivateService, FoyerArticlesDetailComponent } from './foyer-articles-detail.component';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';

import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';

import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: FoyerArticlesListComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: FoyerArticlesDetailComponent,
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
    PaginationModule,
    LoadingSpinnerModule,
    ListToolbarModule,
    SaveBarModule,
    RouterModule.forChild(routes),
    AutoCompleteModule,
    ImageInputModule,
    FoyerArticlesListComponent,
    FoyerArticlesDetailComponent
],
    providers: [
        FoyerArticlesService,
        CanDeactivateService
    ]
})
export class FoyerArticlesModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'FoyerArticlesModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/foyer-articles/', 'HTL_FA_');
    }
}
