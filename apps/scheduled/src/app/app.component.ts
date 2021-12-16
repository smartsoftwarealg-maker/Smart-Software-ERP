import {Component, OnInit} from '@angular/core';
import {HttpService, LoginService} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
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

    constructor(private httpSrv: HttpService,
                private shellSrv: ShellService,
                public langSrv: LanguageService,
                private loginSrv: LoginService) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Scheduled Sales (pre-Alpha)');
        this.shellSrv.setSideNavDataSource([
            administrationNavTree,
            logAdminNavTree
        ]);
        this.httpSrv
            .init()
            .pipe(switchMap(() => this.langSrv.init()),
                  switchMap(_ => this.loginSrv.reload()))
            .subscribe(() => this.loaded = true)
    }

}
