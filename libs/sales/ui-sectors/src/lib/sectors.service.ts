import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Sector} from './sectors-api.class';


export const SECTORS_URL = '/lookups/sectors';

@Injectable({
    providedIn: 'root',
})
export class SectorsService extends BaseEntityService<Sector> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SECTORS_URL);
    }
}
