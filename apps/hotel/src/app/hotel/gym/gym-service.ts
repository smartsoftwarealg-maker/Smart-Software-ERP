import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PaginationModel } from '../../common/pagination/pagination.component';
import { PaymentMethod } from '../hotel-api';
import { Vat } from '../../common/vat/vat-api';
import { HotelOptions } from '../options/options';
import { HttpService } from '../../smart-lib/common/http.service';
import { Agent } from '../../smart-lib/common/models';

const agentsUrl = '/agents';
const vatsUrl = '/articles/vats';
const hotelOptionsUrl = '/hotels/options';

const payMethodsUrl = '/paymethods';
// todo: change this to 50
const defaultPageSize = 49;

@Injectable()
export class GymService {

    clientNamesCache: { [key: number]: string; } = {};
    public listPagination = PaginationModel.newInstance();
    public livePagination = PaginationModel.newInstance();
    // cache
    public vats: { [id: number]: number; };
    public paymentMethods: PaymentMethod[];
    public hotelOptions: HotelOptions = null;

    constructor(private httpSrv: HttpService) {
    }

    public getAgentName(id: number): Observable<string> {
        const name = this.clientNamesCache[id];
        if (name) {
            return of(name);
        }
        return this.httpSrv.get<Agent>(agentsUrl + '/' + id)
            .pipe(
                map<Agent, string>(s => s.denomination)
            );
    }

    public load(reload: boolean = false): Observable<any> {
        if (!reload && this.hotelOptions != null && this.paymentMethods != null && this.vats != null) {
            return of(null);
        }
        this.vats = {};
        return this.httpSrv.getData<PaymentMethod>(payMethodsUrl, 0, defaultPageSize)
            .pipe(
                tap((methods: { body: PaymentMethod[] }) => this.paymentMethods = methods.body),
                switchMap(() => this.httpSrv.get<HotelOptions>(hotelOptionsUrl)),
                tap((options: HotelOptions) => this.hotelOptions = options),
                switchMap(() => this.httpSrv.getData<Vat>(vatsUrl, 0, defaultPageSize)),
                tap((vats: { body: Vat[] }) => vats.body.forEach(v => this.vats[v.id] = v.value))
            );
    }

}
