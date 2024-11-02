import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { MEDICAL_AIDS_URL, MedicalAid } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({ providedIn: 'root' })
export class MedicalAidTypesService extends BaseEntityService<MedicalAid> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MEDICAL_AIDS_URL);
    }

}
