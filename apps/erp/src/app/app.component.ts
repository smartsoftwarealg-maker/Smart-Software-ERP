import { Component, OnInit } from '@angular/core';
import {AppContext, HttpService, LoginInfo, LoginService, UserRightsService} from '@ss/common/api-common';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import { PayrollMonthService } from '@ss/remuneration/payroll-month';
import { of, zip } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';
import {langAssets, navBar} from '../environments/environment';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    loaded = false;

    constructor(private httpSrv: HttpService,
        private shellSrv: ShellService,
        private langSrv: LanguageService,
        private loginSrv: LoginService,
        private monthSelectorSrv: PayrollMonthService,
        private router: Router,
        private rightsSrv: UserRightsService) {
        //langAssets.forEach(e => langSrv.addSource(e[0], e[1]));
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart ERP. 0.1.45');
        this.httpSrv
            .init()
            .pipe(
                switchMap(_ => this.loginSrv.loadContext()),
                switchMap(_ => this.rightsSrv.load()),
                switchMap(() => this.langSrv.init()),
                switchMap(_ => this.langSrv.addSources(langAssets)),
                switchMap(_ => this.httpSrv.get<any>('/ccenter')),
                catchError(_ => of({ description: '' })),
                tap(res => this.shellSrv.setCompanyName(res['description'] || '')))
            .subscribe({
                next: () => {
                    this.loaded = true;
                    this.shellSrv.setSideNavDataSource(navBar);
                    // this.shellSrv.filterSideNav();
                },
                error: () => this.loginSrv.logout()
            });
    }
}
