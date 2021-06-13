import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {NavService} from '../../common/nav.service';
import {RoomTypesListComponent} from './room-types-list.component';
import {RoomTypesDetailComponent} from './room-types-detail.component';
import {VersionService} from '../../common/version.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../common/material.module';
import {HttpClientModule} from '@angular/common/http';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';

const routes: Routes = [
    {
        path: '',
        component: RoomTypesListComponent,
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
        UiPaginationModule,
        LoadingSpinnerModule,
        FatalErrorModule,
        ListToolbarModule,
        SaveBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        RoomTypesListComponent,
        RoomTypesDetailComponent
    ],
    exports: [
        RoomTypesListComponent,
        RoomTypesDetailComponent
    ],
    entryComponents: [
        RoomTypesDetailComponent
    ]
})
export class RoomTypesModule {
    constructor(private navSrv: NavService,
                private verSrv: VersionService,
                private langSrv: LanguageService) {
        const TAG = 'RoomTypesModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/room-types/', 'HTL_RT_');
    }
}
