import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {RECEPTION_URL, Reception} from "./reception-api";


@Injectable({
    providedIn: 'root'
})
export class ReceptionService extends BaseEntityService<Reception> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, RECEPTION_URL);
    }

}
