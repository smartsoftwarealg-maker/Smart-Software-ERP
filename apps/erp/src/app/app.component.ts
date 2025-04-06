import { Component, inject, OnInit } from '@angular/core';
import {HttpService, LoginService} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import {langAssets, navBar} from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { Dir } from '@angular/cdk/bidi';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MessageComponent } from '@ss/common/ui-error-handler';
import { ThemeService } from '@ss/common/ui-theme';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
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
    private themeSrv = inject(ThemeService);

    public langSrv = inject(LanguageService);
    loaded = false;

    ngOnInit() {
        this.themeSrv.load();
        this.shellSrv.setApplicationTitle('Smart ERP 1.94.0');
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
