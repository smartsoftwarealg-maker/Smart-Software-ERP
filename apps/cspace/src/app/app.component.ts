import { Component, inject, OnInit, signal } from '@angular/core';
import { CompanySelectorService, HttpService, LoginService, LoginType } from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import {cSpaceNavTree} from "./cspace/side-nav-tree";
import { environment, langAssets } from '../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { initialize } from './admobile';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '@ss/common/ui-error-handler';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        RouterOutlet,
        MessageComponent
    ],
})
export class AppComponent implements OnInit {
    #companySelectorSrv = inject(CompanySelectorService);
    #deviceSrv = inject(DeviceDetectorService);
    #httpSrv =  inject(HttpService);
    #shellSrv =  inject(ShellService);
    #loginSrv =  inject(LoginService);

    langSrv =  inject(LanguageService);
    loaded = signal(false);

    ngOnInit() {
        const multiCompany = environment['multiCompany'];
        const company = environment['company'];
        const homePage = environment['homePage'];
        this.#companySelectorSrv.multiCompany = multiCompany;
        this.#companySelectorSrv.spaceCompany = company;
        this.#companySelectorSrv.homePage     = homePage;
        this.#loginSrv.customerLogin = LoginType.BOTH;
        this.#loginSrv.customerLogin = LoginType.CUSTOMER;
        this.#shellSrv.setApplicationTitle('Customer Space 2.4');
        this.#httpSrv
            .init(company)
            .pipe(
                switchMap(() => this.langSrv.init()),
                switchMap(() => this.langSrv.addSources(langAssets)),
            ).subscribe({
            next: () => {
                this.#shellSrv.setSideNavDataSource(cSpaceNavTree);
                this.loaded.set(true);
            },
            error: () => this.#loginSrv.logout().then()
        });

        if (this.#deviceSrv.isMobile()) {
            initialize().then(() => {});
        }
    }
}
