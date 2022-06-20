import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_ACC_FILE_URL,
    ACC_ANNEX_CODE_URL,
    ACC_FILE_URL,
    ACC_GENERATION_URL,
    AnnexCode, GenerationInfo,
    TDocument
} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountingGenerationService extends BaseEntityService<TDocument> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_GENERATION_URL);
    }

    generate(info: GenerationInfo): Observable<any> {
        return this.httpSrv.post('/accounting/generations', info);
    }
}
