import { NgModule } from '@angular/core';
import { VatListComponent } from './vat-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { PaginationModule } from '../pagination/pagination.module';
import { FatalErrorModule } from '../../smart-lib/components/fatal-error/fatal-error.module';
import { ListToolbarModule } from '../list-toolbar/list-toolbar.module';
import { VatDetailComponent } from './vat-detail.component';
import { SaveBarModule } from '../save-bar/save-bar.module';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { LanguageService } from '@ss/common/api-common';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { MaterialModule } from '../../smart-lib/components/material.module';

const routes: Routes = [
    {
        path: '',
        component: VatListComponent,
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
        VatListComponent,
        VatDetailComponent
    ],
    exports: [
        VatListComponent,
        VatDetailComponent
    ],
    entryComponents: [
        VatDetailComponent
    ]
})
export class VatModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('assets/locale/lib/vat/', 'VAT_');
    }
}
