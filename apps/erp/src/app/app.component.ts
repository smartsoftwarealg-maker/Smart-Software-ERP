import {Component, OnInit} from '@angular/core';
import {HttpService, LoginService} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
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

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    loaded = false;

    constructor(private httpSrv: HttpService,
                private shellSrv: ShellService,
                public langSrv: LanguageService,
                private loginSrv: LoginService) {}

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
            dashboardNavTree
        ]);
        this.httpSrv.init()
            .pipe(switchMap(() => this.langSrv.init()),
                switchMap(_ => this.loginSrv.reload()))
            .subscribe(() => this.loaded = true)
    }

}
