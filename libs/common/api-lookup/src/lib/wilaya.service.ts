import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Wilaya, WILAYAS_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class WilayaService extends BaseEntityService<Wilaya> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, WILAYAS_URL);
    }

}
