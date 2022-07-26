import { Component, OnInit } from '@angular/core';
import {AppContext, HttpService, LoginInfo, LoginService} from '@ss/common/api-common';
import {map, switchMap, tap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import { hrNavTree } from './hr/side-nav-tree';
import { stockNavTree } from './stock/side-nav-tree';
import { payrollNavTree } from './payroll/side-nav-tree';
import { administrationNavTree } from './administration/side-nav-tree';
import { salesNavTree } from './sales/side-nav-tree';
import { purchasesNavTree } from './purchases/side-nav-tree';
import { logAdminNavTree } from './logistics-admin/side-nav-tree';
import { financeNavTree } from './finance/side-nav-tree';
import { dashboardNavTree } from './dashboard/side-nav-tree';
import { webArchNavTree } from './web-arch/side-nav-tree';
import { PayrollMonthService } from '@ss/remuneration/payroll-month';
import { assetsNavTree } from './assets-app/side-nav-tree';
import { accountingNavTree } from './accounting/side-nav.tree';
import { treasuryNavTree } from './treasury/side-nav.tree';
import { of, zip } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AccessRightsService } from '@ss/common/api-access-rights';
import { organizationsNavTree } from './organizations/side-nav-tree';
import {compiledApplications} from '../environments/environment';
import {scheduledSalesNavTree} from './scheduled-sales/side-nav-tree';

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
        private router: Router) { }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart ERP. 0.1.1');
        this.shellSrv.setSideNavDataSource([
            administrationNavTree,
            organizationsNavTree,
            logAdminNavTree,
            purchasesNavTree,
            stockNavTree,
            salesNavTree,
            financeNavTree,
            hrNavTree,
            payrollNavTree,
            webArchNavTree,
            accountingNavTree,
            assetsNavTree,
            treasuryNavTree,
            dashboardNavTree,
            scheduledSalesNavTree
        ].filter(e => compiledApplications.indexOf(e.name) >= 0));

        this.httpSrv
            .init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe({
                next: () => this.init(),
                error: () => this.loginSrv.logout()
            });
    }

    init() {
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
