import {LookupsCacheService} from '@ss/common/api-lookup';
import {Vat, VATS_URL} from './lookups-api';
import {Observable} from 'rxjs';

export class LookupsService {

    constructor(private lookupCacheSrv: LookupsCacheService) {
    }

    public getVats(): Observable<Vat[]> {
        return this.lookupCacheSrv.load<Vat>(VATS_URL, 'vats');
    }

}
