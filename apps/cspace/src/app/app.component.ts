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

    constructor() {
        this.#companySelectorSrv.multiCompany = environment.multiCompany;
        this.#companySelectorSrv.spaceCompany = environment.company;
        this.#companySelectorSrv.homePage = environment.homePage;
        this.#loginSrv.customerLogin = LoginType.BOTH;
    }

    ngOnInit() {
        this.#loginSrv.customerLogin = LoginType.CUSTOMER;
        this.#shellSrv.setApplicationTitle('Customer Space 2.3');
        this.#httpSrv
            .init()
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
