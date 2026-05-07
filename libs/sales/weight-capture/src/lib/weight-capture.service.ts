import { inject, Injectable } from '@angular/core';
import {AppConfigService, HttpService} from '@ss/common/api-common';
import {map, Observable, tap} from 'rxjs';
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

    updateTare(w: WeightCapture) {
        return this.httpSrv.put('/logistics/weight-capture/update-tare', w);
    }

    updateBrut(w: WeightCapture) {
        return this.httpSrv.put('/logistics/weight-capture/update-brut', w);
    }

    getScalesConfig(): Observable<ScaleConfig|null> {
        return this.appConfigSrv
            .getConfig()
            .pipe(
                map(conf => {
                    return (conf.scales||null) as ScaleConfig;
                })
        );
    }

    hasScaleConfig(): Observable<boolean>{
        return this.getScalesConfig()
            .pipe(map(x => x !== null && x?.url !== null || x?.url !== undefined));
    }
}
