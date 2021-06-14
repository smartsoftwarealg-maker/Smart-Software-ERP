import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SmartCommonModule, CanActivateService, LanguageService, FatalErrorModule, LoadingSpinnerModule} from 'smart-shared';
import {BookingMethodsListComponent} from './booking-methods-list.component';
import { MaterialModule } from '@ss/common/api-common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ListToolbarModule} from '../../common/list-toolbar/list-toolbar.module';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';
import {BookingMethodsDetailComponent} from './booking-methods-detail.component';

const routes: Routes = [
    {
        path: '',
        component: BookingMethodsListComponent,
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
        UiPaginationModule,
        LoadingSpinnerModule,
        FatalErrorModule,
        ListToolbarModule,
        SaveBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        BookingMethodsListComponent,
        BookingMethodsDetailComponent
    ],
    exports: [
        BookingMethodsListComponent,
        BookingMethodsDetailComponent
    ],
    entryComponents: [
        BookingMethodsDetailComponent
    ]
})
export class BookingMethodsModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/booking-methods/', 'HTL_BM_');
    }
}
