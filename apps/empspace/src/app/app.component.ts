import { Component, inject, OnInit } from "@angular/core";
import {HttpService, LoginService} from '@ss/common/api-common';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import {empSpaceNavTree} from './empspace/side-nav-tree';
import {of} from 'rxjs';
import { DeviceDetectorService } from "ngx-device-detector";
import { AdmobClass } from "@ss/common/api-admob";
import { EmpSpaceAdmobClass } from '@ss/remuneration/employee-space';


@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private deviceSrv = inject(DeviceDetectorService);
    private httpSrv =  inject(HttpService);
    private shellSrv =  inject(ShellService);
    private langSrv =  inject(LanguageService);
    private loginSrv =  inject(LoginService);

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
        this.shellSrv.setApplicationTitle('Employee Space (pre-Alpha)');
        this.shellSrv.setSideNavDataSource(empSpaceNavTree);
        this.httpSrv
            .init()
            .pipe(
                switchMap(() => this.langSrv.init()),
                switchMap(_ => this.langSrv.addSources(this.langAssets)),
                )
            .subscribe(() => {
                this.loaded = true;
                this.shellSrv.setSideNavDataSource(empSpaceNavTree);
            });

        if (this.deviceSrv.isMobile()) {
            EmpSpaceAdmobClass
                .initialize()
                .then(EmpSpaceAdmobClass.banner)
                .then(() => {});

        }
    }

}
