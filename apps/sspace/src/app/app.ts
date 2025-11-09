import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterModule } from '@angular/router';
import {CompanySelectorService, HttpService, LanguageService, LoginService, LoginType} from "@ss/common/api-common";
import {ShellService} from "@ss/common/ui-shell";
import {switchMap} from "rxjs/operators";
import {environment, langAssets} from "./environments/environment";
import {sSpaceNavTree} from "./side-nav-tree";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MessageComponent } from '@ss/common/ui-error-handler';


@Component({
    imports: [RouterModule, MatProgressSpinner, MessageComponent],
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    standalone: true
})
export class App implements OnInit {
    protected title = 'sspace';

    #companySelectorSrv = inject(CompanySelectorService);
    // #deviceSrv = inject(DeviceDetectorService);
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
        this.#shellSrv.setApplicationTitle('Customer Space 2.23');
        this.#httpSrv
            .init(company)
            .pipe(
                switchMap(() => this.langSrv.init()),
                switchMap(() => this.langSrv.addSources(langAssets)),
            ).subscribe({
            next: () => {
                this.#shellSrv.setSideNavDataSource(sSpaceNavTree);
                this.loaded.set(true);
            },
            error: () => this.#loginSrv.logout().then()
        });
    }


}
