import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { MEDICAL_AIDS_URL, Reimbursement } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class ReimbursementService extends BaseEntityService<Reimbursement> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MEDICAL_AIDS_URL);
    }
}
