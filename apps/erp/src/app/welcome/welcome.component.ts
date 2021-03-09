import {Component, OnInit, OnDestroy} from '@angular/core';
import {ShellService, SideNavNode} from '@ss/common/ui-shell';
import {LanguageService} from "@ss/common/ui-lang";
import { Router } from '@angular/router';

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

    navData: SideNavNode[];
    display: SideNavNode[];
    historyStack: SideNavNode[] = [];

    constructor(private shellSrv: ShellService, private router: Router, public langSrv: LanguageService) {
    }

    ngOnInit(): void {
        this.navData = this.shellSrv.sideNavDataSource.data;
        this.display = this.navData;
        this.shellSrv.setTitle('SMART_ERP');
        this.shellSrv.enableSearch(
            'SEARCH_APP',
            e => e.subscribe(
                f => {
                    const lowF = f ? f.toLowerCase().trim() : null;
                    if (f && f.length) {
                        // todo: implement filter here
                    } else {
                        this.display = this.navData;
                    }
                },
                err => console.error(err)
            )
        );
    }

    onClick(node: SideNavNode): void {
        if (node.children) {
            this.historyStack.push(node);
            this.display = node.children;
            this.shellSrv.setGoBackFn(() => this.goUp());
        } else if (!!node.route) {
            this.router.navigateByUrl(node.route);
        }
    }

    goUp(): void {
        if (this.historyStack.length) {
            if (this.historyStack.length > 1) {
                this.display = this.historyStack[this.historyStack.length - 2].children;
            } else {
                this.display = this.navData;
            }
            this.historyStack.splice(this.historyStack.length - 1);
        } else {
            this.shellSrv.setGoBackFn(null);
        }
    }

    ngOnDestroy(): void {
        this.shellSrv.reset();
    }

}
