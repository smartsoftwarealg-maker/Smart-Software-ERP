import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShellService } from '@ss/common/ui-shell';
import { Router } from '@angular/router';
import { LanguageService, MainPageService, SideNavNode } from '@ss/common/api-common';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";


@Component({
    selector: 'ss-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule
    ],
})
export class MainPageComponent implements OnInit, OnDestroy {

    public searchResult: SideNavNode[] = null;

    constructor(public srv: MainPageService,
                public shellSrv: ShellService,
                private router: Router,
                public langSrv: LanguageService) {
    }

    ngOnInit(): void {
        this.updateGobackButton();
        this.shellSrv.setTitle(this.shellSrv.applicationTitle);
        this.shellSrv.enableSearch(
            'SEARCH_APP',
            e => e.subscribe(
                (f: string) => {
                    const lowF = f ? f.toLowerCase().trim() : null;
                    if (f && f.length) {
                        this.searchResult = [];
                        const words = lowF.split(' ');
                        this.srv.display.forEach(t => this.searchTree(t, words, this.searchResult));
                    } else {
                        this.searchResult = null;
                    }
                }
            ),
            false // focus the search field for this component
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
        this.clearSearch();
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
            this.shellSrv.setLabels([]);
        }

        this.clearSearch();
    }

    clearSearch(): void {
        if (this.shellSrv.searchFormControl) {
            this.shellSrv.searchFormControl.setValue(null);
        }
        this.searchResult = null;
    }

    ngOnDestroy(): void {
        this.shellSrv.reset();
    }
}
