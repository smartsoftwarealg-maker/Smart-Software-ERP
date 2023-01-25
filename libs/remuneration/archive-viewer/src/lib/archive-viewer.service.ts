import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ARCHIVE_VIEWER_URL, PAYArchive} from './archive-viewer-api';
import {map, Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ArchiveViewerService extends BaseEntityService<PAYArchive> {
    private _from     = 0;
    private _to       = 0;
    private _formulas = '___';
    private _columns  = 'id,lastname,firstname';
    private _compact  = false;
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARCHIVE_VIEWER_URL);
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number; body: PAYArchive[] }> {
        const params = (extraPrams || new HttpParams())
            .set('from', this._from)
            .set('formula', this._formulas)
            .set('compact', this._compact + '')
            .set('to', this._to);

        return super.getList(page, pageSize, filter, sortBy, params)
            .pipe(map(res => {
                if (!this._compact) {
                    res.body.forEach(a => {
                        a.values = [a.v1, a.v2, a.v3, a.v4, a.v5, a.v6, a.v7, a.v9];
                    });
                }
                return res;
            }));
    }

    set from(f: number) {
        this._from = f;
    }

    set to(t: number) {
        this._from = t;
    }

    refreshList(from: number,
                to: number,
                formulas: string,
                columns: string,
                compact: boolean,
                offset: number,
                limit: number): Observable<{ itemCount: number; body: PAYArchive[] }> {
        this._from     = from;
        this._to       = to;
        this._formulas = formulas;
        this._columns  = columns;
        this._compact  = compact;
        const params = new HttpParams()
            .set('from', from)
            .set('formula', formulas)
            .set('compact', this._compact)
            .set('columns', this._columns)
            .set('to', to);

        return super.getList(offset, limit, null, null, params)
            .pipe(map(res => {
                if (!this._compact) {
                    res.body.forEach(a => {
                        a.values = [a.v1, a.v2, a.v3, a.v4, a.v5, a.v6, a.v7, a.v9];
                    });
                }
                return res;
            }));
    }

    override excel(filter?: string): Observable<Blob> {
        const params = new HttpParams()
            .set('from', this._from)
            .set('formula', this._formulas)
            .set('compact', this._compact)
            .set('to', this._to)
            .set('filter', filter|| '')
            .set('columns', this._columns);
        return super.excelWithParams(params);
    }
}
