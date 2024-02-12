import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { GRID_URL, GridRank, RANK_URL } from "./grid-api";
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class GridRankService extends BaseEntityService<GridRank>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, RANK_URL, GRID_URL);
    }
}
