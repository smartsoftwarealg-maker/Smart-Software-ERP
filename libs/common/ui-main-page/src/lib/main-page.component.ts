import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShellService, SideNavNode } from '@ss/common/ui-shell';
import { Router } from '@angular/router';
<<<<<<< HEAD:apps/erp/src/app/welcome/welcome.component.ts
import { WelcomeService } from './welcome.service';
import {LanguageService} from '@ss/common/api-common';
=======
import { MainPageService } from '@ss/common/api-common';
>>>>>>> c79d908ccc496b1b65980d75de07aca1af7a7487:libs/common/ui-main-page/src/lib/main-page.component.ts


@Component({
    selector: 'ss-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

<<<<<<< HEAD:apps/erp/src/app/welcome/welcome.component.ts
    constructor(public srv: WelcomeService,
                public shellSrv: ShellService,
                private router: Router,
                public langSrv: LanguageService) {
=======
    constructor(public srv: MainPageService,
        public shellSrv: ShellService,
        private router: Router,
        public langSrv: LanguageService) {
>>>>>>> c79d908ccc496b1b65980d75de07aca1af7a7487:libs/common/ui-main-page/src/lib/main-page.component.ts
    }

    ngOnInit(): void {
        if (!this.srv.display) {
            this.srv.display = this.shellSrv.navData;
        }
        this.updateGobackButton();
        this.shellSrv.setTitle(this.shellSrv.applicationTitle);
        this.shellSrv.enableSearch(
            'SEARCH_APP',
            e => e.subscribe(
                (f: string) => {
                    const lowF = f ? f.toLowerCase().trim() : null;
                    if (f && f.length) {
                        // todo: implement filter here
                        alert('Filter is NOT IMPLEMENTED YET');
                    } else {
                        this.srv.display = this.shellSrv.navData;
                    }
                }
            )
        );
    }

    onClick(node: SideNavNode): void {
        if (node.children) {
            this.srv.historyStack.push(node);
            this.srv.display = node.children;
            this.updateGobackButton();
        } else if (!!node.route) {
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
            this.srv.display = this.shellSrv.navData;
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
