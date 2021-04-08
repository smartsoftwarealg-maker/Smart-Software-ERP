import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {PayMethod, PayMode} from '@ss/common/api-lookup';
import {map, switchMap, tap} from 'rxjs/operators';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import {PaginationModel} from '@ss/common/ui-pagination';
import {HttpParams} from '@angular/common/http';

export const MPAY_URL = '/mpay';

@Injectable({
    providedIn: 'root'
})
export class PayMethodService extends BaseEntityExtendedService<PayMethod> {
    private _payModes: Map<number, string> = new Map<number, string>();
    private _payMethods: PayMethod[] = [];

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, MPAY_URL);
    }

    load() {
        if (this._payModes.size === 0) {
            this.httpSrv.get<PayMode[]>('/lookups/paymodes')
                .pipe(switchMap(res => {
                    res.forEach(e => this._payModes.set(e.id, e.description));
                    return this.httpSrv.get<PayMethod[]>(MPAY_URL)
                }))
                .subscribe(res => {
                    this._payMethods = res;
                    this._payMethods.forEach(e => e.modeDescription = this._payModes[e.id]);
                    console.log(res);
                });
        }
    }

    get payModes() {
        return this._payModes;
    }

    get payMethods() {
        return this._payMethods;
    }

    getMethod(id: number) {
        return id == null ? null : this._payMethods.find(e => e.id === id);
    }

    getMethodDescription(id: number) {
        return id == null ? null : this._payMethods.find(e => e.id === id)?.description;
    }

    getModeDescription(id: number): string {
        return this._payModes[id];
    }

    getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<PayMethod[]> {
        return super.getPage(pageModel, filter, sortBy, extraPrams)
            .pipe(tap(res => res.forEach(e => e['modeDescription'] = this.getMethodDescription(e.id))));
    }
}
