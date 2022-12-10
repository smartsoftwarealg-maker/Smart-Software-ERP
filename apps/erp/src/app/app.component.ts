import { Component, OnInit } from '@angular/core';
import {AppContext, HttpService, LoginInfo, LoginService} from '@ss/common/api-common';
import {map, switchMap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import { PayrollMonthService } from '@ss/remuneration/payroll-month';
import { of, zip } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AccessRightsService } from '@ss/common/api-access-rights';
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
        private rightsSrv: AccessRightsService,
        private router: Router) {
        langAssets.forEach(e => langSrv.addSource(e[0], e[1]));
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart ERP. 0.1.18');
        this.httpSrv
            .init()
            .pipe(switchMap(() => zip(this.langSrv.init(), this.loginSrv.loadContext())))
            .subscribe({
                next: () => {
                    this.init();
                    this.shellSrv.setSideNavDataSource(navBar);
                },
                error: () => this.loginSrv.logout()
            });
    }

    private init() {
        this.loaded = true;

        this.router
            .events
            .pipe(switchMap((event: Event) => {
                if (event instanceof NavigationEnd) {
                    //console.log(event.url)
                    if (event.url.indexOf('/hr') > 0 || event.url.indexOf('/payroll') > 0) {
                        return zip(this.monthSelectorSrv.curMonthLabel(), this.httpSrv.get<AppContext>('/ccenter'))
                            .pipe(map(res => `${res[1]['description'] || ''} -  ${res[0]}`));
                    }
                    if (event.url?.indexOf('/accounting') >= 0) {
                        return zip(this.httpSrv.get<AppContext>('/ccenter'), this.httpSrv.get<LoginInfo>('/ctx'))
                            .pipe(map(res => `${res[0]['description'] || ''}: ${res[1].ctx['accPeriod'] || '' }  / ${res[1].ctx['accYear'] || '' } `));
                    }
                    if (event.url?.indexOf('/app') >= 0) {
                            return this.httpSrv
                                .get<any>('/ccenter')
                                .pipe(map(res => res['description'] || ''));
                        }
                    }
                return of('');
            }))
            .subscribe(str => this.shellSrv.setLabels([{ title: str }]));
    }
}
