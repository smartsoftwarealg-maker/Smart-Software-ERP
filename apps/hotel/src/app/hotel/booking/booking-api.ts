import {Observable, of} from 'rxjs';
import {Agent, isNumber, HttpService} from 'smart-shared';
import {AutoCompleteModel} from '../../common/auto-complete/auto-complete-model';

const agentsUrl = '/agents';

export class AgentACModel extends AutoCompleteModel<Agent, number> {

    constructor(public httpSrv: HttpService) {
        super();
    }

    filter(filter: string): Observable<Agent[]> {
        return this.httpSrv.getData<Agent[]>(agentsUrl, 0, 5, filter);
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

export enum BookingStates {
    UNCONFIRMED = 1,
    RESERVED = 2,
    CHECKED_IN = 3,
    CHECKED_OUT = 4,
    CANCELED_BY_CLIENT = 5,
    CANCELED_BY_HOTEL = 6
}
