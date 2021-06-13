import {Injectable} from '@angular/core';
import {HttpService} from 'smart-shared';
import {Vat} from '../../common/vat/vat-api';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/ui-pagination';
import {FoyerArticle} from '../hotel-api';

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
            return this.httpSrv.getData<Vat[]>(vatsUrl, 0, 49)
                .pipe(
                    tap(vats => {
                        this.vats = vats;
                        this.vatsMap = {};
                        vats.forEach(v => this.vatsMap[v.id] = v.value + '%');
                    }),
                );
        }
        return of(null);
    }
}
