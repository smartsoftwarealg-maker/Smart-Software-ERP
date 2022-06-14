import {Observable, of} from 'rxjs';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {map} from 'rxjs/operators';

export type Id = number | string;

export interface AutoCompleteModel<T> {

    valueOf: (a: T) => Id;
    toString: (a:T) => string;
    getById: (a: Id) => Observable<T>;
    filter: (a: string) => Observable<T[]>;
    onObjectSelected?: (a: T) => void; // call for changes done by the user only
    onValueChanged?: (a: Id) => void; // called when the value changes
    options: T[];
    cache: T;


    isPerfectMatch(a: T, b: string): boolean; // for some lookups matching the code is a perfect match, ex: typing 25 in a city lookup matches 25-Constontine
}

export class DefaultAutoCompleteModel<T> implements AutoCompleteModel<T> {

    public options: T[];
    public cache: T;
    public filterLoadedData = (x: T[]) => x.filter(e => e && e[this.descriptionField]);

    constructor(public entitySrv: BaseEntityService<T>, public idField: string = 'id', public descriptionField: string = 'description') {}

    onValueChanged = (e: Id) => {};
    onObjectSelected = (e: T) => {};

    valueOf = (x:any) => x ? x[this.idField] : null;

    toString = (x:any) => x ? x[this.descriptionField].substring(0, 50) : null;

    getById = (id: Id) => id ? this.entitySrv.get(id) : of(null);

    filter = (filter: string) => this.entitySrv.getList(0, 20, filter, this.descriptionField).pipe(map(x => this.filterLoadedData(x.body)));

    isPerfectMatch = (obj: any, filter: string) => !!filter && !!obj && !!obj[this.descriptionField] && obj[this.descriptionField].toUpperCase() === filter.toUpperCase();
}

export class EmptyAutoCompleteModel implements AutoCompleteModel<number> {
    options: number[] = [];
    cache: null;

    valueOf = (t: number) => <Id>null;
    toString = (t: Id) => <string>null;
    getById = (t: Id) => of(<number>null);
    filter = (a: string) => of(<number[]>[]);
    isPerfectMatch = (o: number, f: string) => false;
}
