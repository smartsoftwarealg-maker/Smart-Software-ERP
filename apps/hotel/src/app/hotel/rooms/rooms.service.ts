import {Injectable} from '@angular/core';
import {Room, RoomOption, RoomState, RoomType} from '../hotel-api';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {HttpService} from '@ss/common/api-common';
import {PaginationModel} from '@ss/common/ui-pagination';

const roomTypesUrl = '/hotels/roomTypes';
const roomStatesUrl = '/hotels/roomStates';
const roomOptionsUrl = '/hotels/roomOptions';

@Injectable()
export class RoomsService {

    readonly maxCacheAge = 30 * 1000; // 30seconds
    nextUpdate = 0;

    public pagination = PaginationModel.newInstance();
    //
    public roomTypes: { [key: number]: string; };
    public roomStates: { [key: number]: string; };
    public roomOptions: { [key: number]: string; };
    public roomTypesArray: RoomType[];
    public roomStatesArray: RoomState[];
    public roomOptionsArray: RoomOption[];

    constructor(protected httpSrv: HttpService) {
    }

    /**
     * The entity that will be edited or viewed in the detail component
     */
    public activeEntity: Room;

    /**
     * returns of(null) when data is already loaded
     */
    public load(reload: boolean = false): Observable<any> {
        const now = Date.now();
        if (now < this.nextUpdate && !reload && this.roomStates && this.roomTypes && this.roomOptions) {
            return of(null);
        }
        this.roomStates = null;
        this.roomTypes = null;
        this.roomOptions = null;
        return this.httpSrv.getData<RoomState[]>(roomStatesUrl, 0, 49)
            .pipe(
                tap(states => {
                    this.roomStates = {};
                    states.forEach(s => this.roomStates[s.id] = s.description);
                    this.roomStatesArray = states;
                }),
                switchMap(() => this.httpSrv.getData<RoomType[]>(roomTypesUrl, 0, 49)),
                tap(types => {
                    this.roomTypes = {};
                    types.forEach(t => this.roomTypes[t.id] = t.description);
                    this.roomTypesArray = types;
                }),
                switchMap(() => this.httpSrv.getData<RoomOption[]>(roomOptionsUrl, 0, 49)),
                tap(options => {
                    this.roomOptions = {};
                    options.forEach(t => this.roomOptions[t.id] = t.description);
                    this.roomOptionsArray = options;
                    this.nextUpdate = now + this.maxCacheAge;
                })
            );
    }
}
