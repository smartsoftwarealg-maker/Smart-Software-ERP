import { Component, inject, OnInit } from '@angular/core';
import { CompanySelectorService, HttpService, LoginService } from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import { LanguageService } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import {langAssets, navBar} from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { Dir } from '@angular/cdk/bidi';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MessageComponent } from '@ss/common/ui-error-handler';
import { ThemeService } from '@ss/common/ui-theme';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../environments/environment';
import { initialize } from './admobile';

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
    #companySelectorSrv = inject(CompanySelectorService);
    // private snackSrv = inject(SnackBarService);
    // private deviceSrv = inject(DeviceDetectorService);
    private httpSrv = inject(HttpService);
    private shellSrv = inject(ShellService);
    private loginSrv = inject(LoginService);
    private themeSrv = inject(ThemeService);

    public langSrv = inject(LanguageService);
    loaded = false;

    ngOnInit() {
        this.themeSrv.load();
        const multiCompany = environment['multiCompany'] === true;
        const company = environment['company'];
        const homePage = environment['homePage'];
        this.#companySelectorSrv.multiCompany = multiCompany;
        this.#companySelectorSrv.spaceCompany = company;
        this.#companySelectorSrv.homePage     = homePage;
        this.shellSrv.setApplicationTitle('Smart ERP 2.6.45');
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

        // console.log('Main app....................................')
        // if (this.deviceSrv.isMobile()) {
        //     initialize().then(() => {});
        //     // Update CSS variable when ad loads
        //     document.body.classList.add('has-admob-banner');
        //     document.body.style.setProperty('--admob-bottom-padding', '64px'); // Adjust based on your ad size
        //     this.snackSrv.hasAd = true;
        // }
    }

}
