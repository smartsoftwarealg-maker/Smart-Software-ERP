import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CRMTeamMember } from './crm-teams-api.class';

export const TEAMS_LIST = '/crm/teams';
export const TEAMS_LINE_LIST = '/members';

@Injectable({
    providedIn: 'root',
})
export class TeamsLineService extends BaseEntityService<CRMTeamMember> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TEAMS_LINE_LIST ,TEAMS_LIST);
    }
}

