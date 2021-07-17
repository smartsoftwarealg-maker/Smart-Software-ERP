import { Injectable } from '@angular/core';
import { Vat } from '../../common/vat/vat-api';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PaginationModel } from '../../common/pagination/pagination.component';
import { FoyerArticle } from '../hotel-api';
import { HttpService } from '../../smart-lib/common/http.service';

const vatsUrl = '/articles/vats';

@Injectable()
export class FoyerArticlesService {

    vatsMap: { [key: number]: string; } = {};
    vats: Vat[] = [];

    public activeEntity: FoyerArticle;
    public pagination = PaginationModel.newInstance();
    private nextLoadTime = 0;

    constructor(private httpSrv: HttpService) {
    }

    public load(): Observable<any> {
        if (Date.now() > this.nextLoadTime) {
            return this.httpSrv.getData<Vat>(vatsUrl, 0, 49)
                .pipe(
                    tap((vats: { body: Vat[] }) => {
                        this.vats = vats.body;
                        this.vatsMap = {};
                        vats.body.forEach(v => this.vatsMap[v.id] = v.value + '%');
                    }),
                );
        }
        return of(null);
    }
}
