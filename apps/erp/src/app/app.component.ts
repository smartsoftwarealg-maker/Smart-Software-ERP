import { Component, inject, OnInit } from '@angular/core';
import {HttpService, LoginService, UserRightsService} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { BadgeButton, KeepOnToolbar, ShellService } from '@ss/common/ui-shell';
import {langAssets, navBar} from '../environments/environment';
import { WorkflowInboxService } from '@ss/workflow';
import { Router, RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { initialize } from './admobile';
import { ThemeDirective } from '../../../../libs/common/ui-theme/src/lib/theme.directive';
import { Dir } from '@angular/cdk/bidi';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MessageComponent } from '../../../../libs/common/ui-error-handler/src/lib/error-message.component';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        ThemeDirective,
        Dir,
        RouterOutlet,
        MatProgressSpinner,
        MessageComponent
    ],
})
export class AppComponent implements OnInit {
    private httpSrv = inject(HttpService);
    private shellSrv = inject(ShellService);
    private loginSrv = inject(LoginService);

    public langSrv = inject(LanguageService);
    loaded = false;

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Smart ERP 1.58.3');
        this.httpSrv
            .init()
            .pipe(
                switchMap(() => this.langSrv.init()),
                switchMap(() => this.langSrv.addSources(langAssets)),
            ).subscribe({
                next: () => {
                    this.shellSrv.setSideNavDataSource(navBar);
                    this.loaded = true;
                },
                error: () => this.loginSrv.logout().then()
            });
    }

}
