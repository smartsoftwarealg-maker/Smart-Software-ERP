import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { NavService } from '../../common/nav.service';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';

import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';

import { MaterialModule } from '../../smart-lib/components/material.module';
import { PaymentListComponent } from './payment-list.component';
import { PaymentDetailComponent, CanDeactivateService } from './payment-detail.component';
import { PaymentService } from './payment.service'
import { ClientsService } from '../clients/clients.service';
import { LanguageService, RedirectToParentComponent } from '@ss/common/api-common';
import { DatePickerModule } from '../../common/date-picker/date-picker.module';

const routes: Routes = [
    {
        path: '',
        component: PaymentListComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':pid',
        children: [
            {
                path: ':id',
                component: PaymentDetailComponent,
                data: { entity: null },
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', component: RedirectToParentComponent },
            { path: '**', redirectTo: '..', pathMatch: 'full' }, // not found
        ]
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
    AutoCompleteModule,
    DatePickerModule,
    PaymentListComponent,
    PaymentDetailComponent,
    RedirectToParentComponent
],
    exports: [
        PaymentDetailComponent
    ],
    providers: [
        PaymentService,
        ClientsService,
        CanDeactivateService
    ]
})
export class PaymentModule {
    constructor(private navSrv: NavService, private langSrv: LanguageService) {
        const TAG = 'PaymentModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/clients/', 'HTL_CLT_');
    }
}
