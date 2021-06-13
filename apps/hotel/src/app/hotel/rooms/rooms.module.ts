import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {NavService} from '../../common/nav.service';
import {RoomsListComponent} from './rooms-list.component';
import {VersionService} from '../../common/version.service';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {MaterialModule} from '../../common/material.module';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CanDeactivateService, RoomsDetailComponent} from './rooms-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';
import {TagInputModule} from '../../common/tag-input/tag-input.module';
import {RoomsService} from './rooms.service';

const routes: Routes = [
    {
        path: '',
        component: RoomsListComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: RoomsDetailComponent,
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
        FatalErrorModule,
        ListToolbarModule,
        LoadingSpinnerModule,
        MaterialModule,
        UiPaginationModule,
        ReactiveFormsModule,
        SaveBarModule,
        RouterModule.forChild(routes),
        TagInputModule,
    ],
    declarations: [
        RoomsListComponent,
        RoomsDetailComponent
    ],
    exports: [
        RoomsListComponent,
        RoomsDetailComponent
    ],
    providers: [
        RoomsService,
        CanDeactivateService
    ],
    entryComponents: [
        RoomsDetailComponent
    ]
})
export class RoomsModule {

    constructor(private navSrv: NavService,
                private verSrv: VersionService,
                private langSrv: LanguageService) {
        const TAG = 'RoomsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/rooms/', 'HTL_RM_');
    }
}
