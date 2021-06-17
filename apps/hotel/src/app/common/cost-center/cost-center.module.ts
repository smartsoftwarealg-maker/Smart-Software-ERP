import {NgModule} from '@angular/core';
import {CostCenterListComponent} from './cost-center-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import {SmartCommonModule} from 'smart-shared';
import {LoadingSpinnerModule} from 'smart-shared';
import {PaginationModule} from '../pagination/pagination.module';
import {FatalErrorModule} from 'smart-shared';
import {ListToolbarModule} from '../list-toolbar/list-toolbar.module';
import {CostCenterDetailComponent} from './cost-center-detail.component';
import {SaveBarModule} from '../save-bar/save-bar.module';
import {LanguageService} from 'smart-shared';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateService} from 'smart-shared';

const routes: Routes = [
    {
        path: '',
        component: CostCenterListComponent,
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
        PaginationModule,
        LoadingSpinnerModule,
        FatalErrorModule,
        ListToolbarModule,
        SaveBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CostCenterListComponent,
        CostCenterDetailComponent
    ],
    exports: [
        CostCenterListComponent,
        CostCenterDetailComponent
    ],
    entryComponents: [
        CostCenterDetailComponent
    ]
})
export class CostCenterModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/lib/cost-center/', 'CCENTER_');
    }
}

