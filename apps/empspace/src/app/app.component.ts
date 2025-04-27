import { Component, inject, OnInit } from '@angular/core';
import {
    HttpService,
    LanguageService,
    LoginService,
    LoginType,
} from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import { ShellService } from '@ss/common/ui-shell';
import { empSpaceNavTree } from './empspace/side-nav-tree';
import { DeviceDetectorService } from 'ngx-device-detector';
import { EmpSpaceAdmobClass } from '@ss/remuneration/employee-space';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '@ss/common/ui-error-handler';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, MessageComponent],
})
export class AppComponent implements OnInit {
    private deviceSrv = inject(DeviceDetectorService);
    private httpSrv = inject(HttpService);
    private shellSrv = inject(ShellService);
    public langSrv = inject(LanguageService);
    private loginSrv = inject(LoginService);

    langAssets = [
        ['assets/locale/', ''],
        ['assets/locale/administration_', 'ADMINISTRATION_'],
        ['assets/locale/payroll_', 'PAYROLL_'],
        ['assets/locale/common_', 'COMMON_'],
        ['assets/locale/att_', 'ATT_'],
        ['assets/locale/remuneration_', 'REMUN_'],
        ['assets/locale/logistics_', 'LOGISTICS_'],
        ['assets/locale/bl_', 'BL_'],
    ];

    loaded = false;

    ngOnInit() {
        this.loginSrv.customerLogin = LoginType.USER;
        this.shellSrv.setApplicationTitle('Employee Space (pre-Alpha)');
        this.shellSrv.setSideNavDataSource(empSpaceNavTree);
        this.httpSrv
            .init()
            .pipe(
                switchMap(() => this.langSrv.init()),
                switchMap((_) => this.langSrv.addSources(this.langAssets)),
            )
            .subscribe(() => {
                this.loaded = true;
                this.shellSrv.setSideNavDataSource(empSpaceNavTree);
            });

        if (this.deviceSrv.isMobile()) {
            EmpSpaceAdmobClass.initialize()
                .then(EmpSpaceAdmobClass.banner)
                .then(() => {});
        }
    }
}
