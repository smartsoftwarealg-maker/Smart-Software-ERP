import { Component, inject, OnInit, signal } from '@angular/core';

import {
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle
} from '@angular/material/card';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';

import { CompanySelectorService, LoginService } from '@ss/common/api-common';
import { ScheduledSalesHeaderComponent } from '@scheduled-sales/header';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-home.page',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ScheduledSalesHeaderComponent, TranslatePipe],
    templateUrl: './home.page.component.html',
    styleUrl: './home.page.component.css',
})
export class HomePageComponent implements OnInit {
    #companySelectorSrv = inject(CompanySelectorService);
    #loginSrv = inject(LoginService);
    #shellSrv = inject(ShellService);
    #route = inject(ActivatedRoute);
    #router = inject(Router);
    loaded = signal(false);

    constructor() {
        if (this.#companySelectorSrv.homePage) {
            window.location.href = this.#companySelectorSrv.homePage;
        } else {
            this.loaded.set(true);
        }
    }
    ngOnInit() {
        this.#shellSrv.setGoBackPath('../..', this.#route);
        this.#shellSrv.setTitle('COMMON_HOME');
    }

    login() {
        this.#router.navigate(['/login']).then();
    }
}
