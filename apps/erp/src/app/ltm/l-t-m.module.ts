import { inject, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ltmRoutes } from './routes';
import { BadgeButton, BadgeButtonService, KeepOnToolbar, ShellService } from '@ss/common/ui-shell';
import { catchError, map, of, repeat } from 'rxjs';
import { LtmAbnormalTestService } from '@ltm/ltm-api';
import {
    LtmPhysicalTestingService
} from '@ltm/ltm-api';

@NgModule({
    imports: [
        RouterModule.forChild(ltmRoutes)
    ]
})
export class LTMModule {
    #PENDING = 'LTM_PENDING_TESTS'
    #ALERTS  = 'LTM_ALERTS'
    #badgeButtonSrv = inject(BadgeButtonService);
    private shellSrv = inject(ShellService);
    private router = inject(Router);
    private abnormalTestSrv = inject(LtmAbnormalTestService);
    private physicalTestSrv = inject(LtmPhysicalTestingService);

    private anomalyBtn: BadgeButton = {
        badgeId: 3,
        countObservable: this.abnormalTestSrv
            .refresh(new Date(new Date().getTime() - 24 * 3600 * 1000), new Date(), 0, 49)
            .pipe(map(res => ({ count: res.itemCount })),
                repeat( { delay: 120_000 }),
                catchError(() => of({ count: 0})) ),
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: this.#ALERTS,
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.router.navigate(['/app/ltm/ltm-alerts']).then(() => this.anomalyBtn.visible = false)
    };

    private pendingBtn: BadgeButton = {
        badgeId: 2,
        countObservable: this.physicalTestSrv.getPendingCount(),
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: this.#PENDING,
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.router.navigate(['/app/ltm/ltm-sample']).then(() => this.pendingBtn.visible = false)
    };

    constructor() {
        this.#badgeButtonSrv.addBadgeButton(this.anomalyBtn);
        this.#badgeButtonSrv.addBadgeButton(this.pendingBtn);
    }

}
