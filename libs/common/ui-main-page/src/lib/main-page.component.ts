import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShellService } from '@ss/common/ui-shell';
import { Router } from '@angular/router';
import {LanguageService, SideNavNode} from '@ss/common/api-common';
import { MainPageService } from '@ss/common/api-common';


@Component({
    selector: 'ss-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    constructor(public srv: MainPageService,
                public shellSrv: ShellService,
                private router: Router,
                public langSrv: LanguageService) {
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
                        this.srv.searchResult = [];
                        const words = lowF.split(' ');
                        this.srv.display.forEach(t => this.searchTree(t, words, this.srv.searchResult));
                    } else {
                        this.srv.searchResult = null;
                    }
                }
            )
        );
    }

    searchTree(tree: SideNavNode, searchWords: string[], result: SideNavNode[]) {
        if (!tree) {
            return;
        }
        const nodeName = this.langSrv.translate(tree.name).toLowerCase();
        if (searchWords.map(w => nodeName.indexOf(w) > -1).reduce((a, b) => a && b, true)) {
            result.push(tree);
        }
        if (tree.children) {
            tree.children.forEach(c => this.searchTree(c, searchWords, result));
        }
    }

    onClick(node: SideNavNode): void {
        if (node.children) {
            this.srv.historyStack.push(node);
            this.srv.display = node.children;
            this.updateGobackButton();
        } else if (node.route) {
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
