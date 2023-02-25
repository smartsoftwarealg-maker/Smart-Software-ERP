import { Injectable } from '@angular/core';
import {HttpService} from "@ss/common/api-common";
import {Observable} from "rxjs";
import {ImportInfo} from "./import-info";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventoryImportService {

  constructor(private httpSrv: HttpService) { }

    upload(data: FormData): Observable<any> {
        return this.httpSrv.upload('/inventory/injection', data);
    }

    importDoc(document: number, numb: number, destination: number): Observable<number> {
        const data = {
            document:    document,
            number:      numb,
            destination: destination
        };
        return this.httpSrv.put('/imports', data);
    }

}
