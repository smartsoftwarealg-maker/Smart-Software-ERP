import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Mission, MISSIONS_URL, Trajectory, TRAJECTORY_URL, TRANSPORT_URL, ZONE_URL} from './missions-api.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class TrajectoryService extends BaseEntityService<Trajectory> {

  constructor(protected httpSrv: HttpService) {
      super(httpSrv, TRAJECTORY_URL);
  }
}
