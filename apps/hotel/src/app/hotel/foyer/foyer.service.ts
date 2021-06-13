import {Injectable} from '@angular/core';
import {HttpService, Agent} from 'smart-shared';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/ui-pagination';
import {Food, FoyerArticle, FullService, PaymentMethod} from '../hotel-api';
import {SafeResourceUrl} from '@angular/platform-browser';
import {Vat} from '../../common/vat/vat-api';

const agentsUrl = '/agents';
const vatsUrl = '/articles/vats';

const payMethodsUrl = '/paymethods';
// todo: change this to 50
const defaultPageSize = 49;
const foyerArticlesUrl = '/hotels/foyerArticles';

@Injectable()
export class FoyerService {

    clientNamesCache: { [key: number]: string; } = {};
    public pagination = PaginationModel.newInstance();
    public activeEntity: FullService;
    // cache
    public articles: FoyerArticle[];
    public vats: { [id: number]: number; };
    public articlesIndex: { [key: number]: FoyerArticle; } = {};
    public imagesMap: { [key: number]: SafeResourceUrl; } = {};
    public paymentMethods: PaymentMethod[];

    constructor(private httpSrv: HttpService) {
    }

    public getAgentName(id: number): Observable<string> {
        const name = this.clientNamesCache[id];
        if (name) {
            return of(name);
        }
        return this.httpSrv.get<Agent>(agentsUrl + '/' + id)
            .pipe(
                map<Agent, string>(s => s.denomination)
            );
    }

    public load(reload: boolean = false): Observable<any> {
        if (!reload && this.articles != null && this.paymentMethods != null && this.vats != null) {
            return of(null);
        }
        this.imagesMap = {};
        this.vats = {};
        return this.httpSrv.getData<PaymentMethod[]>(payMethodsUrl, 0, defaultPageSize)
            .pipe(
                tap(methods => this.paymentMethods = methods),
                switchMap(() => this.loadArticles(0, null)),
                tap(() => this.articles.forEach(f => this.articlesIndex[f.id] = f)),
                switchMap(() => this.httpSrv.getData<Vat[]>(vatsUrl, 0, 49)),
                tap((vats: Vat[]) => vats.forEach(v => this.vats[v.id] = v.value))
            );
    }

    private loadArticles(page: number, totalCount: number): Observable<any> {
        if (page === 0) {
            return this.httpSrv.getData<Food[]>(foyerArticlesUrl, 0, defaultPageSize)
                .pipe(
                    tap(a => this.articles = a),
                    switchMap(() => this.loadArticles(1, this.httpSrv.itemCount))
                );
        }
        if (this.articles.length < totalCount) {
            return this.httpSrv.getData<Food[]>(foyerArticlesUrl, page, defaultPageSize)
                .pipe(
                    tap(food => this.articles.push(...food)),
                    switchMap(() => this.loadArticles(page + 1, this.httpSrv.itemCount))
                );
        }
        return of(null);
    }
}
