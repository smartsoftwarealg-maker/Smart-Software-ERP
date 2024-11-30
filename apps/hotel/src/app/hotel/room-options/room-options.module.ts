import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { RoomOptionsListComponent } from './room-options-list.component';
import { RoomOptionsDetailComponent } from './room-options-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';

import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';

import { LanguageService } from '@ss/common/api-common';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: RoomOptionsListComponent,
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
    PaginationModule,
    LoadingSpinnerModule,
    ListToolbarModule,
    SaveBarModule,
    RouterModule.forChild(routes),
    RoomOptionsListComponent,
    RoomOptionsDetailComponent
],
    exports: [
        RoomOptionsListComponent,
        RoomOptionsDetailComponent
    ]
})
export class RoomOptionsModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'RoomOptionsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/room-options/', 'HTL_RO_');
    }
}
