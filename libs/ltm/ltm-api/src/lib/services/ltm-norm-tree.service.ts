import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_NORM_TREE_URL, NormTree } from '../ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmNormTreeService extends BaseEntityService<NormTree> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_NORM_TREE_URL);
    }
}
