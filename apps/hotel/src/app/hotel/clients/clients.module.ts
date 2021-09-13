import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { NavService } from '../../common/nav.service';
import { ClientsListComponent } from './clients-list.component';
import { CanDeactivateService, ClientsDetailComponent } from './clients-detail.component';
import { ClientsService } from './clients.service';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { FatalErrorModule } from '../../smart-lib/components/fatal-error/fatal-error.module';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';


const routes: Routes = [
    {
        path: '',
        component: ClientsListComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: ClientsDetailComponent,
        data: { entity: null },
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
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
        RouterModule.forChild(routes),
        AutoCompleteModule,
    ],
    declarations: [
        ClientsListComponent,
        ClientsDetailComponent
    ],
    providers: [
        ClientsService,
        CanDeactivateService
    ]
})
export class ClientsModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'ClientsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/clients/', 'HTL_CLT_');
    }
}
