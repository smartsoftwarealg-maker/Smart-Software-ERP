import {LookupsCacheService} from './lookups-cache.service';
import {Vat, VATS_URL} from './lookups-api';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LookupsService {

    constructor(private lookupCacheSrv: LookupsCacheService) {
    }

    public getVats(): Observable<Vat[]> {
        return this.lookupCacheSrv.load<Vat>(VATS_URL, 'vats');
    }

}
