import { Component, inject, OnInit } from '@angular/core';
import {HttpService, LoginService, UserRightsService} from '@ss/common/api-common';
import {catchError, switchMap, tap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { KeepOnToolbar, ShellService, ToolbarButton } from '@ss/common/ui-shell';
import { of } from 'rxjs';
import {langAssets, navBar} from '../environments/environment';
import { WorkflowInboxService } from '@ss/workflow';
import { Router } from '@angular/router';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private badgeBtn: ToolbarButton = {
        icon: 'fa-solid fa-envelopes-bulk',
        label: 'ADMINISTRATION_WORKFLOW_INBOX',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.showInbox()
    };

    private httpSrv = inject(HttpService);
    private shellSrv = inject(ShellService);
    private loginSrv = inject(LoginService);
    private rightsSrv = inject(UserRightsService);
    private workflowSrv = inject(WorkflowInboxService);
    private router = inject(Router);

    public langSrv = inject(LanguageService);
    loaded = false;

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart ERP. 0.1.69');
        this.httpSrv
            .init()
            .pipe(
                switchMap(_ => this.loginSrv.loadContext()),
                switchMap(_ => this.rightsSrv.load()),
                switchMap(() => this.langSrv.init()),
                switchMap(_ => this.langSrv.addSources(langAssets)),
                switchMap(_ => this.httpSrv.get<any>('/ccenter')),
                catchError(_ => of({ description: '' })),
                tap(res => this.shellSrv.setCompanyName(res['description'] || '')),
                switchMap(() => this.workflowSrv.countInbox()),
                tap(res => {
                    if (res.count > 0) {
                        this.badgeBtn.badgeCount = res.count;
                        this.shellSrv.addButton(this.badgeBtn);
                    }
                }))
            .subscribe({
                next: () => {
                    this.loaded = true;
                    this.shellSrv.setSideNavDataSource(navBar);
                    // this.shellSrv.filterSideNav();
                },
                error: () => this.loginSrv.logout()
            });
    }

    showInbox() {
        this.router.navigate(['/app/administration/workflow-inbox']).then();
    }
}
