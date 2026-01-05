import { Component, inject, OnInit, signal } from '@angular/core';
import { CompanySelectorService, HttpService, LoginService, LoginType } from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import {cSpaceNavTree} from './cspace/side-nav-tree';
import { environment, langAssets } from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '@ss/common/ui-error-handler';
import { AdService } from '@ss/common/api-admob';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, MessageComponent],
})
export class AppComponent implements OnInit {
    #adId = 'ca-app-pub-8350344729252908/7124743448';

    #deviceSrv: DeviceDetectorService;
    // #snackSrv = inject(SnackBarService);
    #companySelectorSrv = inject(CompanySelectorService);
    // #deviceSrv = inject(DeviceDetectorService);
    #httpSrv = inject(HttpService);
    #shellSrv = inject(ShellService);
    #loginSrv = inject(LoginService);
    #adService = inject(AdService);
    langSrv = inject(LanguageService);
    loaded = signal(false);

    ngOnInit() {
        const multiCompany = environment['multiCompany'] === true;
        const company = environment['company'];
        const homePage = environment['homePage'];
        this.#companySelectorSrv.multiCompany = multiCompany;
        this.#companySelectorSrv.spaceCompany = company;
        this.#companySelectorSrv.homePage = homePage;
        this.#loginSrv.customerLogin = LoginType.BOTH;
        this.#loginSrv.customerLogin = LoginType.CUSTOMER;
        this.#shellSrv.setApplicationTitle('Customer Space 2.24');
        this.#httpSrv
            .init(company)
            .pipe(
                switchMap(() => this.langSrv.init()),
                switchMap(() => this.langSrv.addSources(langAssets)),
            )
            .subscribe({
                next: () => {
                    this.#shellSrv.setSideNavDataSource(cSpaceNavTree);
                    this.loaded.set(true);
                    if (this.#deviceSrv.isMobile()) {
                        this.#adService.showBanner(this.#adId);
                    }
                },
                error: () => this.#loginSrv.logout().then(),
            });
    }
}
