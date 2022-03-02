import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Grid, GRID_URL} from './grid-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class GridService extends BaseEntityService<Grid>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GRID_URL);
    }
}
