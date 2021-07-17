import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BookingService, RoomACModel } from '../../booking.service';
import { BookingRoom, Room } from '../../../hotel-api';
import { HttpService } from '../../../../smart-lib/common/http.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'app-add-reserved-room',
    templateUrl: './add-reserved-room.component.html',
    styleUrls: ['./add-reserved-room.component.scss']
})
export class AddReservedRoomComponent implements OnInit, OnDestroy {

    room: Room;
    roomACModel: RoomACModel;
    options: { [id: number]: boolean } = {};

    @Input()
    rooms: BookingRoom[] = [];

    constructor(public bookingSrv: BookingService, public httpSrv: HttpService) {
        this.roomACModel = new RoomACModel(httpSrv, bookingSrv);
        this.roomACModel.onSelection = r => this.room = r;
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.roomACModel.onSelection = null;
    }

    setRoomType(type: number): void {
        this.roomACModel.roomType = type || 0;
    }

    toggleOption(id: number, event: MatCheckboxChange): void {
        this.options[id] = event.checked;
        if (event.checked) {
            this.roomACModel.options.push(id);
        } else {
            this.roomACModel.options = this.roomACModel.options.filter(i => i !== id);
        }
    }

    public addRoom(): void {
        if (this.room) {
            if (this.rooms.filter(x => x.roomId === this.room.id).length === 0) {
                const presetCosts = this.bookingSrv.chargingCosts.filter(c => c.roomType === this.room.roomType);
                this.rooms.push({
                    id: 0,
                    bookingId: 0,
                    roomId: this.room.id,
                    chargingCost: presetCosts.length > 0 ? presetCosts[0].costRate : 0,
                    guests: []
                });
                this.room = null;
                this.roomACModel.roomType = null;
            }
            // todo: tell the user this room is already in
        }
    }

}
