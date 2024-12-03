import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeButton, BadgeButtonService, KeepOnToolbar, ShellService } from '@ss/common/ui-shell';
import { catchError, map, of, repeat } from 'rxjs';
import { LtmAbnormalTestService } from '@ltm/ltm-api';
import {
    LtmPhysicalTestingService
} from '@ltm/ltm-api';

@Injectable({ providedIn: 'root' })
export class preInitService {
    #PENDING = 'LTM_PENDING_TESTS';
    #ALERTS = 'LTM_ALERTS';
    #badgeButtonSrv = inject(BadgeButtonService);
    #router = inject(Router);
    #abnormalTestSrv = inject(LtmAbnormalTestService);
    #physicalTestSrv = inject(LtmPhysicalTestingService);

    private anomalyBtn: BadgeButton = {
        badgeId: 3,
        countObservable: this.#abnormalTestSrv
            .refresh(new Date(new Date().getTime() - 24 * 3600 * 1000), new Date(), false, 0, 49)
            .pipe(map(res => ({ count: res.itemCount })),
                repeat({ delay: 120_000 }),
                catchError(() => of({ count: 0 }))),
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: this.#ALERTS,
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.#router.navigate(['/app/ltm/ltm-alerts']).then(() => this.anomalyBtn.visible = false)
    };

    private pendingBtn: BadgeButton = {
        badgeId: 2,
        countObservable: this.#physicalTestSrv.getPendingCount(),
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: this.#PENDING,
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.#router.navigate(['/app/ltm/ltm-sample']).then(() => this.pendingBtn.visible = false)
    };

    preInit() {
        this.#badgeButtonSrv.addBadgeButton(this.anomalyBtn);
        this.#badgeButtonSrv.addBadgeButton(this.pendingBtn);
    }
}
