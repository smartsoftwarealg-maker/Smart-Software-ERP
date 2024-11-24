import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { RoomsListComponent } from './rooms-list.component';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { CanDeactivateService, RoomsDetailComponent } from './rooms-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { TagInputModule } from '../../common/tag-input/tag-input.module';
import { RoomsService } from './rooms.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';


import { MaterialModule } from '../../smart-lib/components/material.module';
import { LanguageService } from '@ss/common/api-common';

const routes: Routes = [
    {
        path: '',
        component: RoomsListComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: RoomsDetailComponent,
        data: { entity: null },
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // not found
];

@NgModule({
    imports: [
    CommonModule,
    ListToolbarModule,
    LoadingSpinnerModule,
    CommonUiLangModule,
    MaterialModule,
    PaginationModule,
    ReactiveFormsModule,
    SaveBarModule,
    RouterModule.forChild(routes),
    TagInputModule,
    RoomsListComponent,
    RoomsDetailComponent,
],
    exports: [
        RoomsListComponent,
        RoomsDetailComponent
    ],
    providers: [
        RoomsService,
        CanDeactivateService
    ]
})
export class RoomsModule {

    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'RoomsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/rooms/', 'HTL_RM_');
    }
}
