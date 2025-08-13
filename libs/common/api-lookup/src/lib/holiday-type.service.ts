import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class HolidayTypeService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/vacation_types');
    }
}
