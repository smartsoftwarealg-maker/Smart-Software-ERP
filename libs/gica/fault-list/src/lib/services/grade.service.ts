import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { Grade } from '../gica-careers-api';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GradeService {
    private _gradingMode = true;
    private httpSrv =  inject(HttpService);

    get(year: number, id: number): Observable<Grade[]> {
        const params = new HttpParams()
            .set('year', year)
            .set('id', id)
            .set('grading', this._gradingMode);
        return this.httpSrv.get('/gica-careers/gradings', params);
    }

    update(index: number, grades: Grade[]): Observable<number[]> {
        const data = { index: index, grades: grades };
        return this.httpSrv.put('/gica-careers/gradings', data);
    }

    get gradingMode() {
        return this._gradingMode;
    }

    set gradingMode(mode: boolean) {
        this._gradingMode = mode;
    }
}
