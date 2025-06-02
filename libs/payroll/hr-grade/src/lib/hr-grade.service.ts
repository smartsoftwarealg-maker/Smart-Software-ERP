import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HrGrade, GRADE_URL } from './hr-grading-api';

@Injectable({
    providedIn: 'root',
})
export class HrGradeService {
    private _gradingMode = true;
    private httpSrv = inject(HttpService);

    get(paymonth: number, id: number, index: number): Observable<HrGrade[]> {
        const params = new HttpParams()
            .set('month', paymonth)
            .set('id', id)
            .set('index', index)
            .set('grading', this._gradingMode);
        return this.httpSrv.get(GRADE_URL, params);
    }

    update(
        index: number,
        grades: HrGrade[],
        appreciation1?: string,
        appreciation2?: string,
        appreciation3?: string,
    ): Observable<number[]> {
        grades.forEach((g) => {
            g.appreciation1 = appreciation1;
            g.appreciation2 = appreciation2;
            g.appreciation3 = appreciation3;
        });
        const data = { index: index, grades: grades };
        return this.httpSrv.put(GRADE_URL, data);
    }

    get gradingMode() {
        return this._gradingMode;
    }

    set gradingMode(mode: boolean) {
        this._gradingMode = mode;
    }
}
