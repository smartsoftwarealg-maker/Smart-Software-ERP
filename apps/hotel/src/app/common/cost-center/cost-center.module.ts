import { NgModule } from '@angular/core';
import { CostCenterListComponent } from './cost-center-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../pagination/pagination.module';
import { ListToolbarModule } from '../list-toolbar/list-toolbar.module';
import { CostCenterDetailComponent } from './cost-center-detail.component';
import { SaveBarModule } from '../save-bar/save-bar.module';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { FatalErrorModule } from '../../smart-lib/components/fatal-error/fatal-error.module';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: CostCenterListComponent,
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
    ]
})
export class CostCenterModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('assets/locale/lib/cost-center/', 'CCENTER_');
    }
}

