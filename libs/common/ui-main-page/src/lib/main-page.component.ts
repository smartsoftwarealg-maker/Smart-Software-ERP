import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { BadgeButton, KeepOnToolbar, ShellService } from '@ss/common/ui-shell';
import { Router } from '@angular/router';
import {LanguageService, MainPageService, SideNavNode} from '@ss/common/api-common';


import { WorkflowInboxService } from '@ss/workflow';
import { BadgeButtonService } from '@ss/common/ui-shell';
import { AdMobileService } from './ad-mobile.service';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    standalone: true,
    imports: [
        TranslateDirective,
        TranslateDirective
],
})
export class MainPageComponent implements OnInit, OnDestroy {
    #adMobileSrv = inject(AdMobileService);
    #badgeSrv = inject(BadgeButtonService);
    #workflowSrv = inject(WorkflowInboxService);
    #router = inject(Router);
    #badgeBtn: BadgeButton = {
        badgeId: 1,
        countObservable: this.#workflowSrv.countInbox(),
        icon: 'fa-solid fa-envelopes-bulk',
        label: 'ADMINISTRATION_WORKFLOW_INBOX',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.#router.navigate(['/app/administration/workflow-inbox']).then(() => this.#badgeBtn.visible = false)
    };
    public srv = inject(MainPageService);
    public shellSrv = inject(ShellService);
    public langSrv = inject(LanguageService);

    public searchResult: SideNavNode[] = null;


    ngOnInit(): void {
        this.updateGoBackButton();
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
        this.#badgeSrv.addBadgeButton(this.#badgeBtn);
        this.#adMobileSrv.initialize();
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
            this.updateGoBackButton();
        } else if (node.route) {
            this.#router.navigateByUrl(node.route).then();
        }
        this.clearSearch();
    }

    updateGoBackButton() {
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
