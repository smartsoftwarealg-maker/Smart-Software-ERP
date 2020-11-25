import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AutoCompleteService} from "./auto-complete.service";


export class AutoCompleteModel<T> {

    entityService: AutoCompleteService<T>;
    pageSize = 5;

    constructor(enitityService: AutoCompleteService<T>) {
        this.entityService = enitityService;
    }


    getDataByFilter(filter: string): Observable<any> {
        return this.entityService.getList(0, this.pageSize, filter)
            .pipe(map(x => x.body));
    }

    getById(id: number): Observable<any> {
        return this.entityService.get(id);
    }


}
