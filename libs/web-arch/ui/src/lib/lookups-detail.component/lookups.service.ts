import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {Lookup} from 'shared-module/app/modules/models/Lookup';
import {MyHttpService} from 'shared-module';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  private _emitter = new EventEmitter<Lookup>();
  private url = '/units/';

  constructor(private http: MyHttpService) { }

  getById(id: number): Observable<Lookup> {
    return id ?
      this.http.get<Lookup>(this.url + (id || 0)) :
      of ({ id: null, value: 0 });
  }


  // emit(vat: object) {
  //   return this._emitter.emit(vat);
  // }

  get emitter(): EventEmitter<Lookup> {
    return this._emitter;
  }

  removeById(id: number): Observable<number> {
    return id ? this.http.remove(this.url + id) : of(0);
  }

  // save(vat: object): Observable<any> {
  //   return vat['id'] ?
  //     this.http.put(this.url, vat) :
  //     this.http.post(this.url, vat);
  // }

  setURL(url: string) {
    this.url = url + (url.endsWith('/') ? '' : '/');
  }
}
