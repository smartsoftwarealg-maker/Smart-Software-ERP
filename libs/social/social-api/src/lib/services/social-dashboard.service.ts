import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class SocialDashboardService  {
    private http = inject(HttpService);

    dashboard(period: number): Observable<Dashboard> {
        return this.http.get<Dashboard>('/social/dashboard', new HttpParams().set('period', 202401));
    }
}
