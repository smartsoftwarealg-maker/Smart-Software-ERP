import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { ListToolbarModule } from '../../common/list-toolbar/list-toolbar.module';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';

import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';

import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';
import { BookingCostListComponent } from './booking-costs-list.component';
import { BookingCostDetailComponent } from './booking-costs-detail.component';

const routes: Routes = [
    {
        path: '',
        component: BookingCostListComponent,
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
    PaginationModule,
    LoadingSpinnerModule,
    ListToolbarModule,
    SaveBarModule,
    RouterModule.forChild(routes),
    BookingCostListComponent,
    BookingCostDetailComponent
],
    exports: [
        BookingCostListComponent,
        BookingCostDetailComponent
    ]
})
export class BookingCostsModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'BookingCostsModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/booking-costs/', 'HTL_BCT_');
    }
}
