import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Grid, GRID_URL} from './grid-api';
import {HttpService} from '@ss/common/api-common';
import { Observable, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GridService extends BaseEntityService<Grid>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GRID_URL);
    }

    updateGrid(updateGrid: boolean, updateElements: boolean): Observable<{ count: number } > {
        const obs = (this.httpSrv.put('/payroll/grid/update') as Observable<{count: number}>);
        return (updateGrid? this.httpSrv.put('/payroll/grid/update') as Observable<{count: number}> : of({ count: 0}))
            .pipe(switchMap(res => updateElements? obs : of(res)));
    }
}
