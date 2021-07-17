import { Observable, of } from 'rxjs';
import { AutoCompleteModel } from '../../common/auto-complete/auto-complete-model';
import { Account } from '../hotel-api';
import { map } from 'rxjs/operators';
import { isString } from '@ss/common/api-common';
import { HttpService } from '../../smart-lib/common/http.service';

const accountsUrl = '/accounting/accounts';

export class AccountsACModel extends AutoCompleteModel<Account, string> {

    constructor(public httpSrv: HttpService) {
        super();
    }

    filter(filter: string): Observable<Account[]> {
        return this.httpSrv.getData<Account>(accountsUrl, 0, 5, filter)
            .pipe(map((r: { body: Account[] }) => r.body));
    }

    filterArray(filter: string, objects: Account[]): Account[] {
        const lowFilter = filter ? filter.toLowerCase() : null;
        if (!lowFilter) {
            return objects;
        }
        return objects.filter(a => a.accountno && a.accountno.toLowerCase().indexOf(lowFilter) >= 0);
    }

    getById(id: string): Observable<Account> {
        if (id) {
            // return this.httpSrv.get<Account>(accountsUrl + '/' + id);
            return this.httpSrv.getData<Account>(accountsUrl, 0, 1, id)
                .pipe(map((arr: { body: Account[] }) => arr.body[0]));
        }
        return of(null);
    }

    idOf(obj: Account): string {
        return obj ? obj.accountno : null;
    }

    isId(obj: string | Account): boolean {
        return isString(obj);
    }

    toString(obj: Account): string {
        return obj ? obj.accountno : null;
    }
}
