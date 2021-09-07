import { Component, OnInit } from '@angular/core';
import {HttpService, LanguageService, LoginService, SideNavNode} from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import { ShellService } from '@ss/common/ui-shell';
import { exchangeNavTree } from './exchange/side-nav-tree';
import {DeviceDetectorService} from "ngx-device-detector";
import {AdmobClass} from "@ss/common/api-admob";

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    loaded = false;

    constructor(private httpSrv: HttpService,
                private shellSrv: ShellService,
                private loginSrv: LoginService,
                private deviceSrv: DeviceDetectorService,
                public langSrv: LanguageService) {
        if (this.deviceSrv.isMobile()) {
            AdmobClass
                .initialize()
                .then(AdmobClass.banner)
                .then(() => {
                    console.log('Initialized MobAd')
                });
        }
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Currency Exchange, Ver. 0.0.2 Beta');
        this.httpSrv.init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => {
                this.shellSrv.setSideNavDataSource(exchangeNavTree);
                this.loaded = true;
            });
    }
}
