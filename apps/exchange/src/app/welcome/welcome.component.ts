import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShellService, SideNavNode } from '@ss/common/ui-shell';
import { LanguageService } from '@ss/common/ui-lang';
import { Router } from '@angular/router';
import { WelcomeService } from './welcome.service';
import {CurrencyService} from "@ss/common/api-lookup";


@Component({
    selector: 'ss-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    constructor(public srv: WelcomeService,
                public shellSrv: ShellService,
                private router: Router,
                public langSrv: LanguageService,
                private currencySrv: CurrencyService) {
    }

    ngOnInit(): void {
        if (this.srv.navData == null) {
            this.srv.navData = this.shellSrv.sideNavDataSource.data;
            this.srv.display = this.srv.navData;
        }
        this.updateGobackButton();
        this.shellSrv.setTitle(this.shellSrv.applicationTitle);
        this.shellSrv.enableSearch(
            'SEARCH_APP',
            e => e.subscribe(
                f => {
                    const lowF = f ? f.toLowerCase().trim() : null;
                    if (f && f.length) {
                        // todo: implement filter here
                        alert('Filter is NOT IMPLEMENTED YET');
                    } else {
                        this.srv.display = this.srv.navData;
                    }
                },
                err => console.error(err)
            )
        );
        this.currencySrv.load().subscribe(res => res);
    }

    onClick(node: SideNavNode): void {
        if (node.children) {
            this.srv.historyStack.push(node);
            this.srv.display = node.children;
            this.updateGobackButton();
        } else if (!node.route) {
            this.router.navigateByUrl(node.route);
        }
    }

    updateGobackButton() {
        this.shellSrv.setGoBackFn(this.srv.historyStack.length > 0 ? () => this.goUp() : null);
    }

    goUp(): void {
        if (this.srv.historyStack.length > 1) {
            this.srv.display = this.srv.historyStack[this.srv.historyStack.length - 2].children;
        } else {
            this.srv.display = this.srv.navData;
        }
        this.srv.historyStack.splice(this.srv.historyStack.length - 1);
        if (!this.srv.historyStack.length) {
            this.shellSrv.setGoBackFn(null);
        }
    }

    ngOnDestroy(): void {
        this.shellSrv.reset();
    }
}
