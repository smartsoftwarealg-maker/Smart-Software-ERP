import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositDayService {
  private readonly url = 'remuneration/deposit-day';

  constructor(private http: HttpService) { }

  get(): Observable<number> {
    return this.http.get<number>(`${this.url}`);
  }

  update(day: number): Observable<void> {
    return this.http.put<void>(`${this.url}`, { day });
  }
}
