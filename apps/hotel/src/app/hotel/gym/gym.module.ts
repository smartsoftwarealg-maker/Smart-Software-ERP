import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {NavService} from '../../common/nav.service';
import {VersionService} from '../../common/version.service';
import {GymListComponent} from './gym-list.component';
import {MaterialModule} from '../../common/material.module';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {AutoCompleteModule} from '../../common/auto-complete/auto-complete.module';
import {ImageInputModule} from '../../common/image-input/image-input.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';
import {GymService} from './gym-service';
import {GymLiveComponent} from './gym-live.component';
import {CanDeactivateService, GymDetailComponent} from './gym-detail.component';
import {DatePickerModule} from '../../common/date-picker/date-picker.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: GymLiveComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: 'list',
        component: GymListComponent,
        data: {title: 'HTL_GYM_LIST', entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: GymDetailComponent,
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
        SaveBarModule,
        DatePickerModule,
        ReactiveFormsModule
    ],
    declarations: [
        GymListComponent,
        GymLiveComponent,
        GymDetailComponent
    ],
    providers: [
        GymService,
        CanDeactivateService
    ]
})
export class GymModule {
    constructor(private navSrv: NavService,
                private verSrv: VersionService,
                private langSrv: LanguageService) {
        const TAG = 'GymModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/gym/', 'HTL_GYM_');
    }
}
