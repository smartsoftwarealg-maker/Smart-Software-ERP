import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Loan, LOAN_PAYROLL_LOANS_URLS} from './loans-class';
import {HttpService} from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoansService extends BaseEntityService<Loan> {
    #_activeOnly = false;

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, LOAN_PAYROLL_LOANS_URLS);
  }

  toggle() {
      this.#_activeOnly = !this.#_activeOnly;
  }

  get activeOnly(): boolean {
      return this.#_activeOnly;
  }

  override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: Loan[]}> {
        return super.getList(page, pageSize, (this.#_activeOnly? (filter?? '') + '_p_' : filter), sortBy, extraPrams);
    }
}
