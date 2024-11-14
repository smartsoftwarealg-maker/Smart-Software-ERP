import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, EDOHeader, EDOLine, MEDICAL_AIDS_TYPE, SocialAid, TYPES_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PendingEdoService extends BaseEntityService<SocialAid> {
    #_aidType: number|null = null;
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/social/pending-edo');
    }

    addLines(edoId: number, lines: SocialAid[]): Observable<{ count: number }> {
        const data = {edoId: edoId, entityId: lines.map(e => e.id)}
        return this.httpSrv.put('/social/pending-edo', data);
    }
    get aidType(): number|null { return this.#_aidType; }
    set aidType(value: number|null) { this.#_aidType = value; }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: SocialAid[]
    }> {
        const params = this.#_aidType ? (extraPrams || new HttpParams()).append('aidType', this.#_aidType) : extraPrams;
        return super.getList(page, pageSize, filter, sortBy, params);
    }
}
