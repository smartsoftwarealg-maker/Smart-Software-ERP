import { Component, inject, OnInit } from '@angular/core';
import {HttpService, LoginService, UserRightsService} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { BadgeButton, KeepOnToolbar, ShellService } from '@ss/common/ui-shell';
import {langAssets, navBar} from '../environments/environment';
import { WorkflowInboxService } from '@ss/workflow';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { initialize } from './admobile';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private deviceSrv = inject(DeviceDetectorService);
    private httpSrv = inject(HttpService);
    private shellSrv = inject(ShellService);
    private loginSrv = inject(LoginService);

    public langSrv = inject(LanguageService);
    loaded = false;

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart ERP 1.57.0');
        this.httpSrv
            .init()
            .pipe(
                // switchMap(() => this.loginSrv.loadContext()),
                switchMap(() => this.langSrv.init()),
                switchMap(() => this.langSrv.addSources(langAssets)),
            ).subscribe({
                next: () => {
                    this.shellSrv.setSideNavDataSource(navBar);
                    this.loaded = true;
                },
                error: () => this.loginSrv.logout().then()
            });

        if (this.deviceSrv.isMobile()) {
            initialize().then(() => {});
        }
    }

}
