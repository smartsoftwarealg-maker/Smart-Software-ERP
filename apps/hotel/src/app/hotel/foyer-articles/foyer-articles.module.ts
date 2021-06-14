import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {FoyerArticlesListComponent} from './foyer-articles-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import {HttpClientModule} from '@angular/common/http';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';
import {AutoCompleteModule} from '../../common/auto-complete/auto-complete.module';
import {ImageInputModule} from '../../common/image-input/image-input.module';
import {FoyerArticlesService} from './foyer-articles.service';
import {CanDeactivateService, FoyerArticlesDetailComponent} from './foyer-articles-detail.component';

const routes: Routes = [
    {
        path: '',
        component: FoyerArticlesListComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: FoyerArticlesDetailComponent,
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
        FoyerArticlesListComponent,
        FoyerArticlesDetailComponent
    ],
    providers: [
        FoyerArticlesService,
        CanDeactivateService
    ]
})
export class FoyerArticlesModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/foyer-articles/', 'HTL_FA_');
    }
}
