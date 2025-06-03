import { inject, Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { initialize } from './admobile';
import { SnackBarService } from '@ss/common/ui-shell';

@Injectable({ providedIn: 'root' })
export class AdMobileService {
    #snackSrv = inject(SnackBarService);
    #deviceSrv = inject(DeviceDetectorService);
    #initialized = false;

    initialize() {
        if (!this.#initialized) {
            this.#initialized = true;
            if (this.#deviceSrv.isMobile()) {
                initialize().then(() => {});
                document.body.classList.add('has-admob-banner');
                document.body.style.setProperty('--admob-bottom-padding', '64px'); // Adjust based on your ad size
                this.#snackSrv.hasAd = true;
            }
        }
    }
}
