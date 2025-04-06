import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { ABSENCE_FIELDS_URL, AbsenceFiled } from './attendance-api';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AbsenceFieldsService {
    private http = inject(HttpService);

    absenceFields() {
        return this.http.get<AbsenceFiled>(ABSENCE_FIELDS_URL, new HttpParams());
    }

}
