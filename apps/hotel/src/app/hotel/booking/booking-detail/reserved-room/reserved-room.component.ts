import {Component, Input, OnInit} from '@angular/core';
import {BookingService} from '../../booking.service';
import {BookingRoom, BookingRoomGuest, ChargingCost, Room, RoomType} from '../../../hotel-api';
import {LoadingState} from '../../../../common/util';
import { NgIf, NgFor } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../../../smart-lib/components/fatal-error/fatal-error.component';
import { MatIconButton } from '@angular/material/button';
import { TranslateDirective } from '../../../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-reserved-room',
    templateUrl: './reserved-room.component.html',
    styleUrls: ['./reserved-room.component.scss'],
    standalone: true,
    imports: [NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatIconButton, TranslateDirective, MatFormField, MatLabel, MatInput, FormsModule, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatOption, MatTooltip]
})
export class ReservedRoomComponent implements OnInit {

    loadingState: LoadingState = LoadingState.LOADING;
    chargingCosts: ChargingCost[] = [];
    //
    bookingRooms: BookingRoom[] = [];
    guests: BookingRoomGuest[] = [];
    room: Room;
    roomType: RoomType;
    idx = -1;
    guestFieldText = '';

    @Input()
    set index(idx: number) {
        this.idx = idx;
        this.updateRoom();
    }

    @Input()
    set rooms(arr: BookingRoom[]) {
        this.bookingRooms = arr;
        this.updateRoom();
    }

    @Input()
    disabled: boolean;

    constructor(public bookingSrv: BookingService) {
    }

    public ngOnInit(): void {
    }

    /* Edit */

    public remove(): void {
        if (this.bookingRooms && !this.disabled) {
            this.bookingRooms.splice(this.idx, 1);
        }
    }

    public updateRoom() {
        this.guests = [];
        if (this.bookingRooms != null && this.idx >= 0 && this.idx < this.bookingRooms.length) {
            this.guests = this.bookingRooms[this.idx].guests;
            if (this.bookingRooms[this.idx].roomId) {
                const room = this.bookingSrv.roomsCache[this.bookingRooms[this.idx].roomId];
                if (room) {
                    this.room = room;
                    this.updateRoomType();
                    this.updateChargingCosts();
                    this.loadingState = LoadingState.COMPLETE;
                } else {
                    this.bookingSrv.getRoomById(this.bookingRooms[this.idx].roomId)
                        .subscribe(r => {
                            this.room = r;
                            this.bookingSrv.roomsCache[r.id] = r;
                            this.updateRoomType();
                            this.updateChargingCosts();
                            this.loadingState = LoadingState.COMPLETE;
                        }, err => {
                            this.loadingState = LoadingState.ERROR;
                            throw err;
                        });
                }
            }
        } else {
            this.room = null;
            this.roomType = null;
        }
    }

    updateChargingCosts() {
        this.chargingCosts = [];
        if (this.room) {
            this.chargingCosts = this.bookingSrv.chargingCosts.filter(c => c.roomType === this.room.roomType);
        }
    }

    public getCost(): number {
        return this.bookingRooms[this.idx].chargingCost;
    }

    public setCost(x: any): void {
        this.bookingRooms[this.idx].chargingCost = x;
    }

    public onGuestFieldEnter() {
        this.guests.push({
            id: 0,
            bookingRoom: 0,
            fullName: this.guestFieldText
        });
        this.guestFieldText = '';
    }

    public removeGuest(index: number) {
        this.guests.splice(index, 1);
    }

    public canAddGuest() {
        return this.roomType && !this.disabled && this.guests.length < this.roomType.adultCapacity;
    }

    public updateRoomType() {
        if (this.room) {
            this.roomType = this.bookingSrv.roomTypesArray.filter(t => t.id === this.room.roomType)[0];
        } else {
            this.roomType = null;
        }
    }

}
