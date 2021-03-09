import { Injectable } from '@angular/core';
import {HttpService} from "@ss/common/api-common";
import {Observable} from "rxjs";
import {ImportInfo} from "./import-info";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocImportService {

  constructor(private httpService: HttpService) { }

  getList(document: number, agent: number): Observable<ImportInfo[]> {
      const params = new HttpParams()
          .set('document', document + '')
          .set('agent', agent + '');
      return this.httpService.get('/imports', params);
  }

  importDoc(document: number, numb: number, destination: number): Observable<number> {
      const data = {
          document:    document,
          number:      numb,
          destination: destination
      };
      return this.httpService
          .put('/imports', data);
  }
}
