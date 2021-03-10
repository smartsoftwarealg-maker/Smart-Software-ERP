import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShellService, SideNavNode } from '@ss/common/ui-shell';
import { LanguageService } from "@ss/common/ui-lang";
import { Router } from '@angular/router';
import { WelcomeService } from './welcome.service';

interface NavNode {
    icon: string[];
    name: string[];
    route: string;
}

@Component({
    selector: 'ss-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    constructor(public srv: WelcomeService, private shellSrv: ShellService, private router: Router, public langSrv: LanguageService) {
    }

    ngOnInit(): void {
        if (this.srv.navData == null) {
            this.srv.navData = this.shellSrv.sideNavDataSource.data;
            this.srv.display = this.srv.navData;
        }
        this.shellSrv.setTitle('SMART_ERP');
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
    }

    onClick(node: SideNavNode): void {
        if (node.children) {
            this.srv.historyStack.push(node);
            this.srv.display = node.children;
            this.shellSrv.setGoBackFn(() => this.goUp());
        } else if (!!node.route) {
            this.router.navigateByUrl(node.route);
        }
    }

    goUp(): void {
        if (this.srv.historyStack.length) {
            if (this.srv.historyStack.length > 1) {
                this.srv.display = this.srv.historyStack[this.srv.historyStack.length - 2].children;
            } else {
                this.srv.display = this.srv.navData;
            }
            this.srv.historyStack.splice(this.srv.historyStack.length - 1);
        } else {
            this.shellSrv.setGoBackFn(null);
        }
    }

    ngOnDestroy(): void {
        this.shellSrv.reset();
    }

    hashString(text: string, range: number) {
        if (text == null) return -1;
        const len = text.length;
        if (len === 0) return 0;
        let hash = 0;
        for (let i = 0; i < len; i++) {
            let chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash % range;
    };

}
