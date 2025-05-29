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

    get(year: number, id: number, index: number): Observable<Grade[]> {
        const params = new HttpParams()
            .set('year', year)
            .set('id', id)
            .set('index', index)
            .set('grading', this._gradingMode);
        return this.httpSrv.get('/gica-careers/gradings', params);
    }

    update(index: number, grades: Grade[], appreciation1?: string, appreciation2?: string, appreciation3?: string): Observable<number[]> {
        grades.forEach(g => {
            g.appreciation1 = appreciation1;
            g.appreciation2 = appreciation2;
            g.appreciation3 = appreciation3;
        });
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
