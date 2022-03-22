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
import {AccessRightsService} from '@ss/common/api-access-rights';

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
                private router: Router) {}

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart Software ERP. 0.0.1 Beta');
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
            .subscribe({ next:  () => this.init(),
                                  error: () => this.loginSrv.logout()
                                });
    }

    init() {
        this.loaded = true;
        this.router
            .events
            .pipe(tap((event: Event) => {
                if (event instanceof NavigationEnd) {
                        //console.log(event.url)
                    if(event.url.indexOf('/hr') > 0 || event.url.indexOf('/payroll') > 0) {
                        const obs = zip(this.monthSelectorSrv.curMonthLabel(), this.httpSrv.get<any>('/ccenter'));
                        //TODO: fix this bad code.
                        obs.subscribe(res => {
                            const label = `${res[1]['description'] || ''}-  ${res[0]}`;
                            this.shellSrv.setLabels([{title: label}]);
                        });
                    } else {
                        if (event.url?.indexOf('/app') >= 0) {
                            this.httpSrv
                                .get<any>('/ccenter')
                                .subscribe(res => {
                                    const label = res['description'] || '';
                                    this.shellSrv.setLabels([{title: label}]);
                                });
                        }
                    }
                }
            }))
            .subscribe(str => {});
    }
}
