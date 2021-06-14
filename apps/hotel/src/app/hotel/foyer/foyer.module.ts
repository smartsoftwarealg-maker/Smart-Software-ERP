import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {FoyerListComponent} from './foyer-list.component';
import { MaterialModule } from '@ss/common/api-common';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {AutoCompleteModule} from '../../common/auto-complete/auto-complete.module';
import {ImageInputModule} from '../../common/image-input/image-input.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';
import {FoyerService} from './foyer-service';
import {CanDeactivateService, FoyerDetailComponent} from './foyer-detail.component';

const routes: Routes = [
    {
        path: '',
        component: FoyerListComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: FoyerDetailComponent,
        data: {entity: null},
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}, // not found
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
        FoyerListComponent,
        FoyerDetailComponent
    ],
    providers: [
        FoyerService,
        CanDeactivateService
    ]
})
export class FoyerModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/foyer/', 'HTL_FOY_');
    }
}
