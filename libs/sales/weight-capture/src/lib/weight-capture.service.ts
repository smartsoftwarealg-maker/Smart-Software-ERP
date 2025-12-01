import { inject, Injectable } from '@angular/core';
import {AppConfigService, HttpService} from '@ss/common/api-common';
import {map, Observable} from 'rxjs';
import {ScaleConfig, WeightCapture} from './weight-capture-api';

@Injectable({
    providedIn: 'root',
})
export class WeightCaptureService {
    private httpSrv = inject(HttpService);
    private appConfigSrv = inject(AppConfigService);

    getWeightCapture(id: number): Observable<WeightCapture> {
        return this.httpSrv.get<WeightCapture>(
            `/logistics/weight-capture/${id}`,
        );
    }

    getBalanceUrl(): Observable<{ url: string }> {
        return this.httpSrv.get<{ url: string }>('/logistics/weight-capture/balance-url',);
    }

    updateTare(w: WeightCapture) {
        return this.httpSrv.put('/logistics/weight-capture/update-tare', w);
    }

    updateBrut(w: WeightCapture) {
        return this.httpSrv.put('/logistics/weight-capture/update-brut', w);
    }

    getScalesConfig(): Observable<ScaleConfig> {
        return this.appConfigSrv.getConfig().pipe(
            map(conf => {
                return conf.scales as ScaleConfig;
            })
        );
    }
}
