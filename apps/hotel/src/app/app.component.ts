import {Component, OnInit} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {LanguageService} from '@ss/common/ui-lang';
import {ShellService} from '@ss/common/ui-shell';
import {administrationNavTree} from './administration/side-nav-tree';
import {logAdminNavTree} from './logistics-admin/side-nav-tree';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    loaded = false;

    constructor(private httpSrv: HttpService, public shellSrv: ShellService, public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart Software Hotel (pre-Alpha)');
        const appName = 'HOTEL';
        this.shellSrv.setSideNavDataSource([
            administrationNavTree,
            logAdminNavTree
        ].map(n => {
            n.app = appName;
            return n;
        }));
        this.httpSrv.init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => this.loaded = true)
    }

}
