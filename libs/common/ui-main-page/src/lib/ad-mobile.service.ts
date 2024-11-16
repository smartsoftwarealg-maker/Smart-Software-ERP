import { inject, Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { initialize } from './admobile';

@Injectable({ providedIn: 'root' })
export class AdMobileService {
    #deviceSrv = inject(DeviceDetectorService);
    #initialized = false;

    initialize() {
        if (!this.#initialized) {
            this.#initialized = true;
            if (this.#deviceSrv.isMobile()) {
                initialize().then(() => {});
            }
        }
    }
}
