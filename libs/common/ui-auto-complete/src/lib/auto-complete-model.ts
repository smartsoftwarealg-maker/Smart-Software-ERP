import { Observable, of } from "rxjs";
import { BaseEntityService } from "@ss/common/api-base-entity";
import { map } from 'rxjs/operators';

export type Id = number | string;

export interface AutoCompleteModel<T> {

    valueOf: (T) => Id;
    toString: (T) => string;
    getById: (Id) => Observable<T>;
    filter: (string) => Observable<T[]>;

    options: T[];
    cache: T;

}

export class DefaultAutoCompleteModel<T> implements AutoCompleteModel<T> {

    public options: T[];
    public cache: T;

    constructor(public entitySrv: BaseEntityService<T>, public idField: string = 'id', public descriptionField: string = 'description') {
    }

    valueOf = x => x ? x[this.idField] : null;

    toString = x => x ? x[this.descriptionField] : null;

    getById = id => id ? this.entitySrv.get(id) : of(null);

    filter = filter => this.entitySrv.getList(0, 5, filter, this.descriptionField).pipe(map(x => x.body));

}

export class EmptyAutoCompleteModel implements AutoCompleteModel<number> {
    valueOf = t => null;
    toString = t => null;
    getById = t => of(null);
    filter = f => of([]);

    options = [];
    cache: null;
}
