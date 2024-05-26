import { Injectable, signal } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ACTIVITIES_URL, Reimbursement, REIMBURSEMENTS_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class ReimbursementService extends BaseEntityService<Reimbursement> {
    selectedId = signal(0);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, REIMBURSEMENTS_URL, ACTIVITIES_URL);
    }

    override setParentId(id: number) {
        super.setParentId(id);
        this.selectedId.set(id);
    }
}
