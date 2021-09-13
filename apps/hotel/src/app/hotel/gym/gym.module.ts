import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { GymListComponent } from './gym-list.component';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { ImageInputModule } from '../../common/image-input/image-input.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { GymService } from './gym-service';
import { GymLiveComponent } from './gym-live.component';
import { CanDeactivateService, GymDetailComponent } from './gym-detail.component';
import { DatePickerModule } from '../../common/date-picker/date-picker.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { FatalErrorModule } from '../../smart-lib/components/fatal-error/fatal-error.module';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: GymLiveComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: 'list',
        component: GymListComponent,
        data: { title: 'HTL_GYM_LIST', entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: GymDetailComponent,
        data: { entity: null },
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // not found
];


@NgModule({
    imports: [
        CommonModule,
        SmartCommonModule,
        MaterialModule,
        FatalErrorModule,
        LoadingSpinnerModule,
        ListToolbarModule,
        PaginationModule,
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
        private langSrv: LanguageService) {
        const TAG = 'GymModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/gym/', 'HTL_GYM_');
    }
}
