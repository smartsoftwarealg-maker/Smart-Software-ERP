import {Injectable} from '@angular/core';
import {
    APP_URL,
    Article,
    ARTICLE_IMAGE_URL,
    ARTICLES_URL,
    FINAL_PRODUCT,
    QtyPrice
} from './article-api';
import {Observable, of} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';


@Injectable({
    providedIn: 'root'
})
export class FinalProductService extends BaseEntityExtendedService<Article> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARTICLES_URL, APP_URL);
        this.setParentId(FINAL_PRODUCT);
    }

    getPPrice(ref: string, storeId: number, transacId: number, id: number): Observable<QtyPrice> {
        if (ref == null) {
            return of({ document: 0, qty: 0, price: 0});
        }
        const url = `/pprice?find=${ref}&storeId=${storeId}&transacId=${transacId}&id=${id}`;
        return this.httpSrv.get<QtyPrice>(url);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (ARTICLES_URL + '/' + id + ARTICLE_IMAGE_URL) : null;
    }

    override get(iid: number | string): Observable<Article> {
        return super.get(iid);
    }
}
