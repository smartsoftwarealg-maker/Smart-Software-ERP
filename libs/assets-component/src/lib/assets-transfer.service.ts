import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsTransferService {

  constructor(private httpSrv: HttpService) { }

  transfer(src: number, dst: number): Observable<number[]> {
      return this.httpSrv.post('/assets/transfer', { source: src, destination: dst });
  }
}
