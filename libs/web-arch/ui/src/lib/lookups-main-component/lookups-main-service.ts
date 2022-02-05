import {Injectable} from '@angular/core';
import {MyHttpService} from 'shared-module';
import {Observable, of} from 'rxjs';
import {ILookup} from 'shared-module/app/modules/lookups-module/ILookup';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LookupsMainService {
  itemCount = 0;
  private url = '/warch/lookups';
  private idParam = '';

  constructor(private http: MyHttpService) {}
  getList(page: number,
          size: number,
          filter?: string,
          sort?: string): Observable<ILookup[]> {
    const page0 = Math.max(0, page - 1 || 0);
    const strFilter = filter ? `&filter=${filter}` : '';
    const strSort = sort ? `&sort=${sort}` : '';
    const strParam = this.idParam ? '/' + this.idParam : '';
    return this
      .http
      .get<ILookup[]>(`${this.url}${strParam}?page=${page0}-${size}${strFilter}${strSort}`)
      .pipe(tap(res => this.itemCount = this.http.itemCount));
  }

  set param(param: string) {
    this.idParam = param;
  }
}
