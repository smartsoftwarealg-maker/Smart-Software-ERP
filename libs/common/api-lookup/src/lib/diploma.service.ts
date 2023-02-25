import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Diploma, DIPLOMAS_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class DiplomaService extends BaseEntityService<Diploma> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DIPLOMAS_URL);
    }

}
