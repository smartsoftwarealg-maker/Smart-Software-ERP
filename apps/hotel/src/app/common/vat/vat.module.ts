import {NgModule} from '@angular/core';
import {VatListComponent} from './vat-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import {SmartCommonModule} from 'smart-shared';
import {LoadingSpinnerModule} from 'smart-shared';
import {PaginationModule} from '../pagination/pagination.module';
import {FatalErrorModule} from 'smart-shared';
import {ListToolbarModule} from '../list-toolbar/list-toolbar.module';
import {VatDetailComponent} from './vat-detail.component';
import {SaveBarModule} from '../save-bar/save-bar.module';
import {LanguageService} from 'smart-shared';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateService} from 'smart-shared';

const routes: Routes = [
    {
        path: '',
        component: VatListComponent,
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
        langSrv.addSource('/assets/locale/lib/vat/', 'VAT_');
    }
}
