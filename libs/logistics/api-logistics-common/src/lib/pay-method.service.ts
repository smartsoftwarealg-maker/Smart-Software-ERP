import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {PayMethod, PayMode} from '@ss/common/api-lookup';
import {switchMap} from 'rxjs/operators';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';

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

    getModes(): Observable<PayMode[]> {
        return this.httpSrv.get<PayMode[]>('/lookups/paymodes');
    }
    load() {
        this.httpSrv.get<PayMode[]>('/lookups/paymodes')
            .pipe(switchMap(res => {
                res.forEach(e => this._payModes.set(e.id, e.description));
                return this.httpSrv.get<PayMethod[]>(MPAY_URL)
            }))
            .subscribe(res => {
                this._payMethods = res;
                this._payMethods.forEach(e => e.modeDescription = this._payModes.get(e.id));
            });
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

    // getMethodDescription(id: number) {
    //     return id == null ? null : this._payMethods.find(e => e.id === id)?.description;
    // }

    getModeDescription(id: number): string {
        return this._payModes.get(id);
    }
}
