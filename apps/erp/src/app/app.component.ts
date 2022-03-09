import {Component, OnInit} from '@angular/core';
import {HttpService, LoginService} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import {hrNavTree} from './hr/side-nav-tree';
import {stockNavTree} from './stock/side-nav-tree';
import {payrollNavTree} from './payroll/side-nav-tree';
import {administrationNavTree} from './administration/side-nav-tree';
import {salesNavTree} from './sales/side-nav-tree';
import {purchasesNavTree} from './purchases/side-nav-tree';
import {logAdminNavTree} from './logistics-admin/side-nav-tree';
import {financeNavTree} from './finance/side-nav-tree';
import {dashboardNavTree} from './dashboard/side-nav-tree';
import {webArchNavTree} from './web-arch/side-nav-tree';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {assetsNavTree} from './assets-app/side-nav-tree';
import {of, zip} from 'rxjs';
import {Event, NavigationEnd, Router} from '@angular/router';

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
                private router: Router) {}

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart Software ERP  (pre-Alpha)');
        this.shellSrv.setSideNavDataSource([
            administrationNavTree,
            logAdminNavTree,
            purchasesNavTree,
            stockNavTree,
            salesNavTree,
            hrNavTree,
            payrollNavTree,
            financeNavTree,
            dashboardNavTree,
            webArchNavTree,
            assetsNavTree
        ]);
        this.httpSrv
            .init()
            .pipe(switchMap(() => this.langSrv.init()),
                  switchMap(_ => this.loginSrv.reload()),
                  switchMap(_ =>  this.monthSelectorSrv.curMonthLabel()))
            .subscribe({ next:  () => this.loaded = true,
                                  error: () => this.loginSrv.logout()
                                });

        this.router
            .events
            .pipe(tap((event: Event) => {
                if (event instanceof NavigationEnd) {
                        //console.log(event.url)
                    if(event.url.indexOf('/hr') > 0 || event.url.indexOf('/payroll') > 0) {
                        const obs = this.monthSelectorSrv.curMonthLabel();
                        //TODO: fix this bad code.
                        obs.subscribe(str => this.shellSrv.setLabels([{title: str}]));
                    } else {
                        this.shellSrv.setLabels([{title: ''}]);
                    }
                }
            }))
            .subscribe(str => {});
    }

}
