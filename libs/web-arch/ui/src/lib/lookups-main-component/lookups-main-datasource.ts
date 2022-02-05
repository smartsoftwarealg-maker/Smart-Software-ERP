import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ILookup} from 'shared-module/app/modules/lookups-module/ILookup';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GenericDataService} from 'shared-module';
import {catchError, finalize, switchMap} from 'rxjs/operators';
import {LookupsMainService} from './lookups-main-service';

export class LookupsMainDatasource implements DataSource<ILookup> {
  public itemCount = 0;
  private contentSubject = new BehaviorSubject<ILookup[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: LookupsMainService) {}

  loadDef(): Observable<number> {
    return this.load(0, 5, null, null);
  }

  load(page: number, size: number, filter: string, sort: string): Observable<number> {
    this.loadingSubject.next(true);
    return  this
      .service
      .getList(page, size, filter, sort)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).pipe(switchMap(res => {
        this.contentSubject.next(res);
        this.itemCount = this.service.itemCount;
        return of (this.itemCount);
      }))
  }

  connect(collectionViewer: CollectionViewer): Observable<ILookup[]> {
    return this.contentSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.contentSubject.complete();
    this.loadingSubject.complete();
  }

  filter(predicate: (e: any) => boolean) {
    const filtered = this.contentSubject.value.filter(e => predicate(e));
    this.contentSubject.next(filtered);
  }

  update(value: ILookup) {
    const temp = this.contentSubject.value;
    const idx = temp.findIndex(e => e['id'] === value['id']);
    if (idx >= 0) {
      temp[idx] = value;
    } else {
      temp.push(value);
    }
    this.contentSubject.next(temp);
  }
}
