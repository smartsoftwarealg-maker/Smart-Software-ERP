import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark, MARKS_URL } from './lookups-api';
import {LookupsCacheService} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class StockLookupsService {

    constructor(private lookupCacheSrv: LookupsCacheService) {
    }

    public getMarks(): Observable<Mark[]> {
        return this.lookupCacheSrv.load<Mark>(MARKS_URL, 'marks');
    }

}
