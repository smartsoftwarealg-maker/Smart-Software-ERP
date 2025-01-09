import { Component, inject, OnInit } from '@angular/core';
import { HttpService, LoginService, LoginType } from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import {cSpaceNavTree} from "./cspace/side-nav-tree";
import { homePage, langAssets } from '../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { initialize } from './admobile';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '@ss/common/ui-error-handler';
import { navBar } from '../../../erp/src/environments/environment';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        RouterOutlet,
        MessageComponent
    ],
})
export class AppComponent implements OnInit {
    private deviceSrv = inject(DeviceDetectorService);
    private httpSrv =  inject(HttpService);
    private shellSrv =  inject(ShellService);
    langSrv =  inject(LanguageService);
    private loginSrv =  inject(LoginService);

    loaded = false;

    constructor() {
        this.loginSrv.customerLogin = LoginType.BOTH;
        this.loginSrv.homePage = homePage;
    }
    ngOnInit() {
        this.loginSrv.customerLogin = LoginType.CUSTOMER;
        this.shellSrv.setApplicationTitle('Customer Space 1.7');
        this.httpSrv
            .init()
            .pipe(
                switchMap(() => this.langSrv.init()),
                switchMap(() => this.langSrv.addSources(langAssets)),
            ).subscribe({
            next: () => {
                this.shellSrv.setSideNavDataSource(cSpaceNavTree);
                this.loaded = true;
            },
            error: () => this.loginSrv.logout().then()
        });

        if (this.deviceSrv.isMobile()) {
            initialize().then(() => {});
        }
    }
}
