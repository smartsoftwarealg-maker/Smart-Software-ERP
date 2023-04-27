import {Component, OnInit} from '@angular/core';
import {HttpService, LoginService} from '@ss/common/api-common';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import {empSpaceNavTree} from './empspace/side-nav-tree';
import {of} from 'rxjs';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
     langAssets = [
        ['assets/locale/', ''],
        ['assets/locale/administration_', 'ADMINISTRATION_'],
        ['assets/locale/common_', 'COMMON_'],
        ['assets/locale/att_', 'ATT_'],
        ['assets/locale/logistics_', 'LOGISTICS_'],
    ];

    loaded = false;

    constructor(private httpSrv: HttpService,
                public shellSrv: ShellService,
                public langSrv: LanguageService,
                private loginSrv: LoginService) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Employee Space (pre-Alpha)');
        this.shellSrv.setSideNavDataSource(empSpaceNavTree);
        this.httpSrv
            .init()
            .pipe(switchMap(_ => this.loginSrv.loadContext()),
                  switchMap(() => this.langSrv.init()),
                  switchMap(_ => this.langSrv.addSources(this.langAssets)),
                  switchMap(_ => this.httpSrv.get<any>('/ccenter')),
                  catchError(_ => of({ description: '' })),
                  tap(res => this.shellSrv.setCompanyName(res['description'] || '')))
            .subscribe(() => {
                this.loaded = true;
                this.shellSrv.setSideNavDataSource(empSpaceNavTree);
            })
    }
}
