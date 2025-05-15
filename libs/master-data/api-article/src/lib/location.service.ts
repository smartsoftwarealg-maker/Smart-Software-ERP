import {Injectable} from '@angular/core';
import { Location, StockInfo } from "./article-api";
import {Observable} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LocationService extends BaseEntityExtendedService<Location> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/store-locations');
    }
}
