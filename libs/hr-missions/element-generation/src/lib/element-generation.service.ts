import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Element } from './element-generation.api';

export interface MUpdate {
    missions:number[];
}

@Injectable({
    providedIn: 'root',
})
export class ElementGenerationService {
    constructor(private httpSrv: HttpService) {}

    getReports() {
        return this.httpSrv.get<Element[]>('/missions/generation/report');
    }

    generate(missions: number[]) {
        const mUpdate = {missions:missions}
        return this.httpSrv.post('/missions/generation/elements', mUpdate);
    }

}
