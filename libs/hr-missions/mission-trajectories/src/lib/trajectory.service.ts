import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Trajectory, TRAJECTORY_URL} from './trajectory';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class TrajectoryService extends BaseEntityService<Trajectory>{

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, TRAJECTORY_URL);
  }
}
