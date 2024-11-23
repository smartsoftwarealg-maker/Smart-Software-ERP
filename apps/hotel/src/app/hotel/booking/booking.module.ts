import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavService } from '../../common/nav.service';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { BookingService } from './booking.service';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingThComponent } from './booking-view/table/header.component';
import { TimelineComponent } from './booking-view/table/timeline.component';

import { DatePickerModule } from '../../common/date-picker/date-picker.module';
import { RoomOptionsFilterComponent } from './booking-view/room-options-filter/room-options-filter.component';
import { NotificationsComponent } from './booking-view/notifications/notifications.component';
import { StatisticsComponent } from './booking-view/statistics/statistics.component';
import { BookingDetailComponent, CanDeactivateService } from './booking-detail/booking-detail.component';
import { AutoCompleteModule } from '../../common/auto-complete/auto-complete.module';
import { ReservedRoomComponent } from './booking-detail/reserved-room/reserved-room.component';
import { AddReservedRoomComponent } from './booking-detail/add-reserved-room/add-reserved-room.component';
import { SaveBarModule } from '../../common/save-bar/save-bar.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';

import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';

import { ColorSelectModule } from '../../smart-lib/components/color-select/color-select.module';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';


const routes: Routes = [
    {
        path: '',
        component: BookingViewComponent,
        data: { entity: null },
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: BookingDetailComponent,
        data: { entity: null },
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // not found
];

@NgModule({
    imports: [
    CommonModule,
    MaterialModule,
    AutoCompleteModule,
    LoadingSpinnerModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    ColorSelectModule,
    SaveBarModule,
    RouterModule.forChild(routes),
    BookingViewComponent,
    BookingThComponent,
    TimelineComponent,
    StatisticsComponent,
    RoomOptionsFilterComponent,
    NotificationsComponent,
    BookingDetailComponent,
    ReservedRoomComponent,
    AddReservedRoomComponent,
],
    providers: [
        BookingService,
        CanDeactivateService
    ]
})
export class BookingModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'BookingModule';
        navSrv.setChildren(TAG, routes);
        langSrv.addSource('assets/locale/hotel/booking/', 'HTL_BK_');
    }
}
