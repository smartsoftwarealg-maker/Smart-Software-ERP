import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { signal, WritableSignal } from '@angular/core';
import { AutoCompleteModel, Id } from '@ss/common/ui-auto-complete';
import { BankCheck, CheckService } from '@ss/treasury/api-checks';

export class UndepositedCheckLookupModel implements AutoCompleteModel<BankCheck> {
    public options: WritableSignal<BankCheck[]> = signal([]);
    public cache: BankCheck;
    public onValueChanged = (e: Id) => {};
    public onObjectSelected = (e: BankCheck) => {};

    constructor(private checkSrv: CheckService, private bankId: number) {}

    valueOf = (x: BankCheck) => x ? x.id : null;

    toString = (x: BankCheck) => x ? x.number : null;

    getById = (id: Id) => id === null || id === undefined ? of(null) :
        this.checkSrv.get(id as number).pipe(map(c => c ? {
            id: c.id,
            number: c.number as unknown as string,
            date: c.date,
            amount: c.amount,
            bank: c.bank
        } : null));

    filter = (filter: string) => this.checkSrv.getUndepositedChecks(this.bankId).pipe(
        map(list => filter ? list.filter(c => c.number?.toLowerCase().includes(filter.toLowerCase())) : list)
    );

    isPerfectMatch = (obj: BankCheck, filter: string) => !!filter && !!obj?.number && obj.number.toUpperCase() === filter.toUpperCase();

    addEntry(): Observable<number> {
        return of(0);
    }
}
