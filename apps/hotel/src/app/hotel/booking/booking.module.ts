import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {
    SmartCommonModule,
    CanActivateService,
    ColorSelectModule,
    LanguageService,
    FatalErrorModule,
    LoadingSpinnerModule
} from 'smart-shared';
import {BookingViewComponent} from './booking-view/booking-view.component';
import {BookingService} from './booking.service';
import { MaterialModule } from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookingThComponent} from './booking-view/table/header.component';
import {TimelineComponent} from './booking-view/table/timeline.component';
import {FitTextModule} from '../../common/fit-text/fit-text.module';
import {DatePickerModule} from '../../common/date-picker/date-picker.module';
import {RoomOptionsFilterComponent} from './booking-view/room-options-filter/room-options-filter.component';
import {NotificationsComponent} from './booking-view/notifications/notifications.component';
import {StatisticsComponent} from './booking-view/statistics/statistics.component';
import {BookingDetailComponent, CanDeactivateService} from './booking-detail/booking-detail.component';
import {AutoCompleteModule} from '../../common/auto-complete/auto-complete.module';
import {ReservedRoomComponent} from './booking-detail/reserved-room/reserved-room.component';
import {AddReservedRoomComponent} from './booking-detail/add-reserved-room/add-reserved-room.component';
import {SaveBarModule} from '../../common/save-bar/save-bar.module';


const routes: Routes = [
    {
        path: '',
        component: BookingViewComponent,
        data: {entity: null},
        canActivate: [CanActivateService]
    },
    {
        path: ':id',
        component: BookingDetailComponent,
        data: {entity: null},
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}, // not found
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AutoCompleteModule,
        FatalErrorModule,
        LoadingSpinnerModule,
        UiPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        SmartCommonModule,
        FitTextModule,
        DatePickerModule,
        ColorSelectModule,
        SaveBarModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        BookingViewComponent,
        BookingThComponent,
        TimelineComponent,
        StatisticsComponent,
        RoomOptionsFilterComponent,
        NotificationsComponent,
        BookingDetailComponent,
        ReservedRoomComponent,
        AddReservedRoomComponent
    ],
    providers: [
        BookingService,
        CanDeactivateService
    ]
})
export class BookingModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/booking/', 'HTL_BK_');
    }
}
