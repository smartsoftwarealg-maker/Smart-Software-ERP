import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../common/material.module';
import {HttpClientModule} from '@angular/common/http';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';
import {NavService} from '../../common/nav.service';
import {VersionService} from '../../common/version.service';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {ClientsListComponent} from './clients-list.component';
import {CanDeactivateService, ClientsDetailComponent} from './clients-detail.component';
import {ClientsService} from './clients.service';
import {AutoCompleteModule} from '../../common/auto-complete/auto-complete.module';


const routes: Routes = [
    {
        path: '',
        component: ClientsListComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: ClientsDetailComponent,
        data: {entity: null},
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
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
        UiPaginationModule,
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
                private verSrv: VersionService,
                private langSrv: LanguageService) {
        const TAG = 'ClientsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('/assets/locale/hotel/clients/', 'HTL_CLT_');
    }
}
