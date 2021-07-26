import { Component, Input } from '@angular/core';
import { PaginationModel } from '../../../../common/pagination/pagination.component';
import { LanguageService } from '@ss/common/api-common';
import { HttpService } from '../../../../smart-lib/common/http.service';

enum NotificationType {
    GUEST_OVERSTAYED = 1,
    GUESTS_IN_DIRT_ROOM = 2,
    GUESTS_OUT_TODAY = 3,
    GUESTS_IN_TODAY = 4,
    GUEST_MISSED_RESERVATION = 5,
    ROOM_IS_DIRTY = 6
}

export interface Notification {
    nType: NotificationType;
    description: string;
    parameters: { [key: string]: string; };
    fn: () => void;
    icon: string;
    iconColor: number; // 1 = primary, 2 = warn, 3 = accent
}

@Component({
    selector: 'app-htl-bk-notification',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent {

    readonly notificationsUrl = '/hotels/notification';

    lastRefresh = 0;
    readonly refreshDelay = 10000;
    badge: string = null;
    paginationModel: PaginationModel;
    notifications: Notification[] = [];

    @Input() openRoomFn: (id: number) => void = this.doNothing;
    @Input() openBookingFn: (id: number) => void = this.doNothing;

    constructor(public httpSrv: HttpService, public langSrv: LanguageService) {
        this.paginationModel = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0 });
        this.paginationModel.onChange = () => this.refresh();
    }

    doNothing() {
    }

    toNotification(n: any): Notification {
        switch (n.nType) {
            case NotificationType.ROOM_IS_DIRTY:
                return {
                    nType: n.nType,
                    description: 'HTL_BK_N_DIRTY_ROOM',
                    parameters: { room: n.room.number },
                    fn: () => this.openRoomFn(n.room.id),
                    icon: 'key',
                    iconColor: 1 // primary
                };
            case NotificationType.GUESTS_IN_DIRT_ROOM:
                return {
                    nType: n.nType,
                    description: 'HTL_BK_N_GUEST_CHECK_IN_DIRT',
                    parameters: { guest: n.agent.denomination },
                    fn: () => this.openBookingFn(n.bookingId),
                    icon: 'frown-o',
                    iconColor: 2 // warn
                };
            case NotificationType.GUESTS_IN_TODAY:
                return {
                    nType: n.nType,
                    description: 'HTL_BK_N_GUEST_CHECK_IN_TODAY',
                    parameters: { guest: n.agent.denomination },
                    fn: () => this.openBookingFn(n.bookingId),
                    icon: 'sign-in',
                    iconColor: 1 // primary
                };
            case NotificationType.GUESTS_OUT_TODAY:
                return {
                    nType: n.nType,
                    description: 'HTL_BK_N_GUEST_CHECK_OUT_TODAY',
                    parameters: { guest: n.agent.denomination },
                    fn: () => this.openBookingFn(n.bookingId),
                    icon: 'sign-out',
                    iconColor: 2 // warn
                };
            case NotificationType.GUEST_MISSED_RESERVATION:
                return {
                    nType: n.nType,
                    description: 'HTL_BK_N_GUEST_MISSED_RESRV',
                    parameters: { guest: n.agent.denomination },
                    fn: () => this.openBookingFn(n.bookingId),
                    icon: 'clock-o',
                    iconColor: 3 // accent
                };
            case NotificationType.GUEST_OVERSTAYED:
                return {
                    nType: n.nType,
                    description: 'HTL_BK_N_GUEST_OVERSTAYED',
                    parameters: { guest: n.agent.denomination },
                    fn: () => this.openBookingFn(n.bookingId),
                    icon: 'clock',
                    iconColor: 2 // warn
                };
        }
        return {
            nType: n.nType,
            description: '??? ' + n.nType,
            parameters: {},
            fn: () => {
            },
            icon: '',
            iconColor: 0
        };
    }

    periodicRefresh() {
        if (this.lastRefresh > Date.now()) {
            return;
        }
        this.refresh();
    }

    refresh() {
        // todo: display "Loading Spinner" or some other shit while loading
        this.notifications = [];
        this.lastRefresh = Date.now() + this.refreshDelay;
        this.httpSrv.getData<any>(this.notificationsUrl, this.paginationModel.page - 1, this.paginationModel.pageSize)
            .subscribe(result => {
                this.notifications = result.body.map(n => this.toNotification(n));
                const c = result.itemCount;
                this.paginationModel.elementCount = c;
                if (c > 99) {
                    this.badge = '99';
                } else {
                    this.badge = c + '';
                }
            }, err => {
                this.badge = '!';
            }
            );
    }
}
