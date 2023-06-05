import { Component, inject, OnInit } from '@angular/core';
import {HttpService, LoginService, UserRightsService} from '@ss/common/api-common';
import {catchError, switchMap, tap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {langAssets, navBar} from '../environments/environment';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private httpSrv = inject(HttpService);
    private shellSrv = inject(ShellService);
    private loginSrv = inject(LoginService);
    private router = inject(Router);
    private rightsSrv = inject(UserRightsService);

    public langSrv = inject(LanguageService);
    loaded = false;

    constructor() {
        //langAssets.forEach(e => langSrv.addSource(e[0], e[1]));
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart ERP. 0.1.58');
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
