import { Component, EventEmitter, Input, Output } from '@angular/core';
import { compareDate } from '../../../../common/util';
import { Room } from '../../../hotel-api';
import { dateDiff } from '../../booking.service';
import { BookingStates } from '../../booking-api';

@Component({
    selector: 'app-booking-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

    firstDay: Date;
    lastDay: Date;
    today: Date = new Date();
    todayIdx = 0;
    // rendering vars
    divHeight = 32; // px
    nullColor = '#000000';
    // model
    data: any[] = [];
    days: Date[] = [];
    cache: {
        bookings: any[]
        occupied: boolean;
    }[] = [];
    cancelledMode = false;

    @Input()
    set showCancelled(b: boolean) {
        this.cancelledMode = b;
        this.updateCache();
    }

    @Input()
    agentId = null;

    @Input()
    room: Room;

    @Input()
    set timelineDays(days: Date[]) {
        if (days == null) {
            this.days = [];
        } else {
            this.days = days;
            this.today = new Date(); // the page could be open for more than 24 hours
            this.firstDay = days[0];
            this.lastDay = days[days.length - 1];
            if (compareDate(this.today, this.firstDay) < 0) {
                this.todayIdx = -1;
            } else if (compareDate(this.today, this.lastDay) > 0) {
                this.todayIdx = this.days.length;
            } else {
                for (let i = 0; i < this.days.length; i++) {
                    this.todayIdx = -1;
                    if (compareDate(this.days[i], this.today) === 0) {
                        this.todayIdx = i;
                        break;
                    }
                }
            }
        }
        this.updateCache();
    }

    @Input()
    set timelineData(data: any[]) {
        if (data == null) {
            this.data = [];
        } else {
            this.data = data;
        }
        this.updateCache();
    }

    @Output()
    bookingClicked: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    newBooking: EventEmitter<{ start: number, length: number }> = new EventEmitter<{ start: number, length: number }>();

    @Output()
    roomClicked: EventEmitter<void> = new EventEmitter<void>();

    updateCache() {
        this.data = this.data.map(b => {
            delete b.yOrder;
            delete b.cancelled;
            delete b.divWidth;
            delete b.span;
            delete b.colorHex;
            return b;
        });
        this.cache = this.days.map(d => {
            const maxConflictYOrder = Math.max(-1, ...this.getBookingsAt(d, false).map(x => x.yOrder));
            const bookings = this.getBookingsAt(d, true).map(b => {
                b.divWidth = this.getColWidth(b, d);
                b.cancelled = BookingStates.CANCELED_BY_CLIENT === b.bookingState || BookingStates.CANCELED_BY_HOTEL === b.bookingState;
                b.span = this.getColSpan(b, d);
                b.colorHex = b.cancelled ? '#CCCCCC' : this.intToColor(b.color);
                return b;
            }).sort((a, b) => {
                if (a.span > b.span) {
                    return -1;
                }
                if (a.span < b.span) {
                    return 1;
                }
                return 0;
            });
            const baseYOrder = maxConflictYOrder + 1;
            for (let i = 0; i < bookings.length; i++) {
                bookings[i].yOrder = baseYOrder + i;
                if (i === 0) {
                    bookings[i].divTopMargin = (baseYOrder * this.divHeight) + 'px';
                } else {
                    bookings[i].divTopMargin = '0';
                }
            }
            return { bookings, occupied: bookings.length > 0 };
        }
        );
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i].occupied) {
                const span = Math.max(0, ...this.cache[i].bookings.filter(x => !x.cancelled).map(x => x.span));
                for (let j = i; j < span; j++) {
                    this.cache[i].occupied = true;
                }
                i += span;
            }
        }
    }

    intToColor(i: number) {
        if (i == null) {
            return this.nullColor;
        } else {
            let str = i.toString(16);
            while (str.length < 6) {
                str = '0'.concat(str);
            }
            return '#' + str;
        }
    }

    // headOrTail: true = head, false = tail
    getBookingsAt(D: Date, headOrTail: boolean) {
        return this.data
            .filter(B => {
                if (this.days.length <= 0) {
                    return false;
                }
                const isHead: boolean = compareDate(D, this.days[0]) === 0 || compareDate(D, B.dateIn) === 0;
                if (headOrTail !== isHead) {
                    return false;
                }
                const cancelled = BookingStates.CANCELED_BY_CLIENT === B.bookingState
                    || BookingStates.CANCELED_BY_HOTEL === B.bookingState;
                if (cancelled && !this.cancelledMode) {
                    return false;
                }
                let outDate = B.dateOut;
                if (B.bookingState === BookingStates.CHECKED_IN && compareDate(this.today, outDate) >= 0) {
                    // outDate = this.today;
                    outDate = new Date(this.today);
                    outDate.setDate(outDate.getDate() + 1);
                }
                return (this.agentId == null || this.agentId === B.customer)
                    && compareDate(B.dateIn, D) <= 0
                    && (compareDate(outDate, D) > 0 || compareDate(B.dateOut, B.dateIn) === 0)
                    && (B.secondActionDate == null || compareDate(B.secondActionDate, D) >= 0);
            }
            );
    }

    getColWidth(b: any, d: Date): string {
        return (this.getColSpan(b, d) * 100) + '%';
    }

    getColSpan(booking: any, d: Date): number {
        if (booking) {
            if (compareDate(d, booking.dateIn) === 0 || compareDate(d, this.firstDay) === 0) {
                return this.daysUntilCheckout(d, booking);
            }
        }
        return 0;
    }

    daysUntilCheckout(from: Date, booking: any): number {
        let checkoutDate = booking.dateOut;
        if (booking.bookingState === BookingStates.CHECKED_IN) {
            if (compareDate(checkoutDate, this.today) <= 0) {
                // checkoutDate = this.today;
                checkoutDate = new Date(this.today);
                checkoutDate.setDate(checkoutDate.getDate() + 1);
            }
        } else if (booking.bookingState === BookingStates.CHECKED_OUT) {
            checkoutDate = booking.secondActionDate;
        }
        const count = dateDiff(from, checkoutDate);
        const maxCount = 1 + dateDiff(from, this.lastDay);
        return Math.min(maxCount, count);
    }

    onRoomClick() {
        this.roomClicked.emit();
    }

    onBookingClick(b: any) {
        this.bookingClicked.emit(b);
    }

    onCellClick(n: number) {
        if (n < this.todayIdx || this.cache[n].occupied) {
            return;
        }
        if (this.agentId != null && this.agentId > 0) {
            return;
        }
        this.newBooking.emit({ start: n, length: 1 });
    }

    public getCellColor(i: number): string {
        if (i < this.todayIdx) {
            if (i % 2 === 1) {
                return '#AAAAAA';
            } else {
                return '#999999';
            }
        }
        if (i > this.todayIdx) {
            if (i % 2 === 1) {
                return '#FFFFFF';
            } else {
                return '#E0E0FF';
            }
        }
        return '#FFD700';
    }
}
