import { inject, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ltmRoutes } from './routes';
import { KeepOnToolbar, ShellService, ToolbarButton } from '@ss/common/ui-shell';
import { Subscription } from 'rxjs';
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
    private shellSrv = inject(ShellService);
    private router = inject(Router);
    private abnormalTestSrv = inject(LtmAbnormalTestService);
    private subscription: Subscription|null = null;
    private subscription2: Subscription|null = null;
    private physicalTestSrv = inject(LtmPhysicalTestingService);

    private badgeBtn: ToolbarButton = {
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: this.#ALERTS,
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.showAlerts()
    };

    private pendingBtn: ToolbarButton = {
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: this.#PENDING,
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.showPendingTests()
    };

    constructor() {
        this.subscription = this.abnormalTestSrv
            .refresh(new Date(new Date().getTime() - 24 * 3600 * 1000), new Date(), 0, 49)
            .subscribe(res => {
                if (res.itemCount > 0) {
                    this.badgeBtn.badgeCount = res.itemCount;
                    this.shellSrv.addButton(this.badgeBtn);
                }
            });
        this.subscription2 = this.physicalTestSrv
            .getPendingCount()
            .subscribe(res => {
                if (res.count > 0) {
                    this.pendingBtn.badgeCount = res.count;
                    this.shellSrv.addButton(this.pendingBtn);
                }
            });
    }

    private showAlerts() {
        this.shellSrv.removeButton(this.#ALERTS);
        this.router.navigate(['/app/ltm/ltm-alerts']).then();
        this.subscription?.unsubscribe();
    }

    private showPendingTests() {
        this.shellSrv.removeButton(this.#PENDING);
        this.router.navigate(['/app/ltm/ltm-sample']).then();
        this.subscription2?.unsubscribe();
    }

}
