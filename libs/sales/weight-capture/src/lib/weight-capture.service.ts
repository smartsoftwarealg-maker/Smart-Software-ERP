import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { WeightCapture } from './weight-capture-api';

@Injectable({
    providedIn: 'root',
})
export class WeightCaptureService {
    constructor(private httpSrv: HttpService) {}

    getWeightCapture(id: number): Observable<WeightCapture> {
        return this.httpSrv.get<WeightCapture>(
            `/logistics/weight-capture/${id}`,
        );
    }

    getBalanceUrl(): Observable<{ url: string}> {
        return this.httpSrv.get<{ url: string }>('/logistics/weight-capture/balance-url',);
    }

    updateTare(w: WeightCapture) {
        return this.httpSrv.put('/logistics/weight-capture/update-tare', w);
    }

    updateBrut(w: WeightCapture) {
        return this.httpSrv.put('/logistics/weight-capture/update-brut', w);
    }
}
