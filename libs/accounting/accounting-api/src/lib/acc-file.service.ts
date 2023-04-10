import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_CTX_URL, ACC_FILE_URL, ACC_POLICY_URL, ACCFile, ACCPolicy} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable, tap} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccFileService extends BaseEntityService<ACCFile> {
    _accFile: ACCFile = null;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_FILE_URL);
    }

    getCurrentCenterName(): Observable<string> {
        return this.httpSrv
            .get<any>('/ccenter')
            .pipe(map(res => res['description'] || ''));
    }

    selectFolder(id: number, year: number, period: number): Observable<any> {
        return this.httpSrv.put(ACC_CTX_URL, {fileId:  id, period: period, accYear: year});
    }

    set accFile(file: ACCFile) {
        this._accFile = file;
    }

    get accFile() {
        return this._accFile;
    }

    get fileDescription() {
        return this._accFile?.description || '';
    }

    get curPeriod() {
        return this._accFile?.curPeriod || 1;
    }
}
