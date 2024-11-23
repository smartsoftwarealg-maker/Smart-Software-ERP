import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { RoomTypesListComponent } from './room-types-list.component';
import { RoomTypesDetailComponent } from './room-types-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';

import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';

import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: RoomTypesListComponent,
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
    PaginationModule,
    LoadingSpinnerModule,
    ListToolbarModule,
    SaveBarModule,
    RouterModule.forChild(routes),
    RoomTypesListComponent,
    RoomTypesDetailComponent
],
    exports: [
        RoomTypesListComponent,
        RoomTypesDetailComponent
    ]
})
export class RoomTypesModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'RoomTypesModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/room-types/', 'HTL_RT_');
    }
}
