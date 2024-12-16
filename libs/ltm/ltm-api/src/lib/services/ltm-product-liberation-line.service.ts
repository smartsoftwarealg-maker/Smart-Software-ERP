import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    LTM_BLEACHER_URL,
    LTM_PRODUCT_LIBERATION_LINE_URL,
    LTM_PRODUCT_LIBERATION_PRODUCTS_URL,
    LTM_ZONE_URL,
    LTMProductLiberationLine
} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import { Lookup } from "@ss/common/api-lookup";

@Injectable({
  providedIn: 'root'
})
export class LtmProductLiberationLineService extends BaseEntityService<LTMProductLiberationLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_PRODUCT_LIBERATION_PRODUCTS_URL, LTM_PRODUCT_LIBERATION_LINE_URL);
    }
}
