import { inject, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ltmRoutes } from './routes';
import { KeepOnToolbar, ShellService, ToolbarButton } from '@ss/common/ui-shell';
import { LtmAbnormalTestService } from '@ss/ltm/ltm';
import { Subscription } from 'rxjs';

@NgModule({
    imports: [
        RouterModule.forChild(ltmRoutes)
    ]
})
export class LTMModule {
    private shellSrv = inject(ShellService);
    private router = inject(Router);
    private abnormalTestSrv = inject(LtmAbnormalTestService);
    private subscription: Subscription|null = null;
    private badgeBtn: ToolbarButton = {
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: 'LTM_ALERTS',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.showAlerts()
    };

    constructor() {
        const TODAY = new Date(new Date().getTime() - 24 * 3600 * 1000);
        this.subscription = this.abnormalTestSrv
            .refresh(TODAY, new Date(), 0, 49)
            .subscribe(res => {
                if (res.itemCount > 0) {
                    this.badgeBtn.badgeCount = res.itemCount;
                    this.shellSrv.addButton(this.badgeBtn);
                }
            });
    }

    private showAlerts() {
        this.shellSrv.removeButton('LTM_ALERTS');
        this.subscription?.unsubscribe();
        this.router.navigate(['/app/ltm/ltm-alerts']).then();
    }
}
