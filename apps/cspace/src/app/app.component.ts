import { Component, inject, OnInit } from '@angular/core';
import { HttpService, LoginService, LoginType } from '@ss/common/api-common';
import { catchError, switchMap, tap } from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import {cSpaceNavTree} from "./cspace/side-nav-tree";
import { langAssets } from '../environments/environment';
import { of } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private deviceSrv = inject(DeviceDetectorService);
    private httpSrv =  inject(HttpService);
    private shellSrv =  inject(ShellService);
    langSrv =  inject(LanguageService);
    private loginSrv =  inject(LoginService);

    loaded = false;


    ngOnInit() {
        this.loginSrv.customerLogin = LoginType.CUSTOMER;
        this.shellSrv.setApplicationTitle('Customer Space 1.0');
        this.httpSrv
            .init()
            .pipe(switchMap(_ => this.loginSrv.loadContext()),
                switchMap(() => this.langSrv.init()),
                switchMap(_ => this.langSrv.addSources(langAssets)),
                switchMap(_ => this.httpSrv.get<any>('/ccenter')),
                catchError(_ => of({ description: '' })),
                tap(res => this.shellSrv.setCompanyName(res['description'] || '')))
            .subscribe(() => {
                this.loaded = true;
                this.shellSrv.setSideNavDataSource(cSpaceNavTree);
            });
    }
}
