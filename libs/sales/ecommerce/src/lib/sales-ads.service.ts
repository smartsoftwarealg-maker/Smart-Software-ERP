import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SalesAdsService extends BaseEntityService<Lookup> {
   constructor(protected override httpSrv: HttpService) {
       super(httpSrv, '/ads');
   }

    upsert(id: number, fd: FormData): Observable<any> {
        const url = `/ads/${id}/upload`;
        return this.httpSrv.post(url, fd);
    }

    image(id: number): Observable<any> {
        return id? this.httpSrv.getBlob(`/ads/${id}/download`) : of(null);
    }
}
