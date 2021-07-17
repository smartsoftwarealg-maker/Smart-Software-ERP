import { Observable, of } from 'rxjs';
import { AutoCompleteModel } from '../../common/auto-complete/auto-complete-model';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { DisplayableService, FullService, Service } from '../hotel-api';
import { map, switchMap, tap } from 'rxjs/operators';
import { Agent } from '../../smart-lib/common/models';
import { isNumber, isString } from '@ss/common/api-common';
import { HttpService } from '../../smart-lib/common/http.service';

const gymAppCode = 15;
export const gymPendingUrl = '/hotels/gymPending';
const fullServicesUrl = '/hotels/services/';
const fullGymServicesUrl = fullServicesUrl + gymAppCode;
const invoiceUrl = '/hotels/invoice';
const agentsUrl = '/agents';

export interface DisplayableGymService extends Service {
    agentName: string;
    timeStr: string;
}

export class AgentACModel extends AutoCompleteModel<Agent, number> {

    constructor(public httpSrv: HttpService) {
        super();
    }

    filter(filter: string): Observable<Agent[]> {
        return this.httpSrv.getData<Agent>(agentsUrl, 0, 5, filter)
            .pipe(map((r: { body: [] }) => r.body));
    }

    filterArray(filter: string, objects: Agent[]): Agent[] {
        const lowFilter = filter ? filter.toLowerCase() : null;
        if (!lowFilter) {
            return objects;
        }
        return objects.filter(a => a.denomination.toLowerCase().indexOf(lowFilter) >= 0);
    }

    getById(id: number): Observable<Agent> {
        if (id) {
            return this.httpSrv.get<Agent>(agentsUrl + '/' + id);
        } else {
            return of(null);
        }
    }

    idOf(obj: Agent): number {
        return obj ? obj.id : null;
    }

    isId(obj: number | Agent): boolean {
        return isNumber(obj);
    }

    toString(obj: Agent): string {
        return obj ? obj.denomination : null;
    }
}

export class FullServiceDataSource extends BackendDataSource<DisplayableService> {
    constructor(httpSrv: HttpService) {
        super(httpSrv, fullGymServicesUrl);
    }

    getById(id: number | string): Observable<DisplayableService> {
        if (this.url == null) {
            return of(null);
        }
        return this.httpSrv.get<DisplayableService[]>(this.url + '?id=' + id)
            .pipe(
                map(s => s[0])
            );
    }

    getPendingById(id: number | string): Observable<FullService> {
        if (this.url == null) {
            return of(null);
        }
        return this.httpSrv.get<Service[]>(gymPendingUrl + '?id=' + id)
            .pipe(
                map<Service[], FullService>(s => {
                    return {
                        service: s[0],
                        invoiceNumber: null,
                        details: []
                    };
                })
            );
    }

    save(obj: DisplayableService): Observable<boolean> {
        const id = obj.service.id;
        if (this.url == null || id == null || !Number.isFinite(id)
            || Number.isNaN(id) || !Number.isInteger(id)) {
            return of(false);
        }
        return id > 0
            ? this.httpSrv.put(this.url, obj).pipe(map(() => true))
            : this.httpSrv.post(this.url, obj).pipe(map(newId => {
                if (isString(newId)) {
                    newId = +newId;
                }
                (obj as any).id = newId;
                return true;
            }));
    }

    public generateInvoice(record: FullService): Observable<any> {
        return this.httpSrv.post(invoiceUrl, record)
            .pipe(
                tap(r => {
                    record.service.id = r._1.id;
                    record.service.invoiceId = r._2.transac_id;
                    record.invoiceNumber = r._3.number;
                })
            );
    }

}

export enum BookingStates {
    UNCONFIRMED = 1,
    RESERVED = 2,
    CHECKED_IN = 3,
    CHECKED_OUT = 4,
    CANCELED_BY_CLIENT = 5,
    CANCELED_BY_HOTEL = 6
}

