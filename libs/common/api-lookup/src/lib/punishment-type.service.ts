import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Diploma, DIPLOMAS_URL, PUNISHMENT_TYPE_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class PunishmentTypeService extends BaseEntityService<Lookup> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, PUNISHMENT_TYPE_URL);
    }

}
