import {Observable, of} from 'rxjs';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {map} from 'rxjs/operators';
import {Office} from '@ss/common/api-lookup';

export type Id = number | string;

export interface AutoCompleteModel<T extends {id: Id}> {
    valueOf: (a: T) => Id;
    toString: (a: T) => string;
    getById: (a: Id) => Observable<T>;
    filter: (a: string) => Observable<T[]>;
    onObjectSelected?: (a: T) => void; // call for changes done by the user only
    onValueChanged?: (a: Id) => void; // called when the value changes
    options: T[];
    cache: T;
    addEntry: (entry: string) => Observable<number>;


    isPerfectMatch(a: T, b: string): boolean; // for some lookups matching the code is a perfect match, ex: typing 25 in a city lookup matches 25-Constontine
}

export class DefaultAutoCompleteModel<T extends {id: Id}> implements AutoCompleteModel<T> {
    #searchLength = 49;
    public options: T[];
    public cache: T;
    public filterLoadedData =
        (x: T[]) => x.filter(e => e && !!((e as any))[this.descriptionField] );

    constructor(public entitySrv: BaseEntityService<T>,
                public idField: string = 'id',
                public descriptionField: string = 'description') {
    }

    onValueChanged = (e: Id) => {};
    onObjectSelected = (e: T) => {};

    valueOf = (x: T) => x ? (x as any)[this.idField] as Id: null;

    toString = (x: any) => x ? x[this.descriptionField]?.substring(0, 50) : null;

    getById = (id: Id) => id === null || id === undefined? of(null) : this.entitySrv.get(id);

    filter = (filter: string) => this.entitySrv.getList(0, this.#searchLength, filter, this.descriptionField).pipe(map(x => this.filterLoadedData(x.body)));

    isPerfectMatch = (obj: any, filter: string) => !!filter && !!obj && !!obj[this.descriptionField] && obj[this.descriptionField].toUpperCase() === filter.toUpperCase();

    clear() {
        this.options = [];
    }

    addEntry(entry: string): Observable<number> {
        if (this.descriptionField === 'description') {
            const entity = {id: 0, description: entry};
            entity['id'] = 0;
            entity['description'] = entry;
            return this.entitySrv.save((entity as unknown) as T);
        } else return of(0);
    }

    set searchLength(v: number) {
        this.#searchLength = v;
    }
}

// export class EmptyAutoCompleteModel implements AutoCompleteModel<number> {
//     options: number[] = [];
//     cache: null;
//
//     valueOf = () => <Id>null;
//     toString = () => <string>null;
//     getById = () => of(<number>null);
//     filter = () => of(<number[]>[]);
//     isPerfectMatch = (o: number, f: string) => false;
//
//     addEntry(entry: string): Observable<number> {
//         return of(0);
//     }
// }

export class CodeDescriptionAutoCompleteModel<T extends {id: Id}> extends DefaultAutoCompleteModel<T> {
    constructor(public override entitySrv: BaseEntityService<T>) {
        super(entitySrv, 'id', 'description');
    }

    override toString = (x: Office) => x ?
        `${x.description.substring(0, 50)} ` + (x.code? `(${x.code})` : '') :
        null;
}
