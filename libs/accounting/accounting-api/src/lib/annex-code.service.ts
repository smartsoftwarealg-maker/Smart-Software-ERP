import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_ACC_FILE_URL, ACC_ANNEX_CODE_URL, ACC_FILE_URL, AnnexCode} from './accounting-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class AnnexCodeService extends BaseEntityService<AnnexCode> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_ANNEX_CODE_URL);
    }
}
