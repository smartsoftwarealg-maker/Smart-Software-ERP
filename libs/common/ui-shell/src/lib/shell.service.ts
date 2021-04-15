import { Injectable } from "@angular/core";
import { LanguageService } from '@ss/common/ui-lang';
import { strTakeUntil, strDropEndUntil } from '@ss/common/api-common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatTreeNestedDataSource } from '@angular/material/tree';

export interface ToolbarButton {
    icon: string;
    label: string;
    click?: () => void;
    disabled: boolean;
    visible: boolean;
    keepOnToolbar: boolean;
    menuItems?: MenuItem[];
}

export interface MenuItem {
    icon: string;
    label: string;
    click: () => void;
    disabled: boolean;
    visible: boolean;
}

export interface SideNavNode {
    icon: string;
    name: string;
    route?: string;
    children?: SideNavNode[];
    backgroundColor?: string;
}



@Injectable({
    providedIn: 'root'
})
export class ShellService {

    backgroundColors: string[] = [
        '#606a6c', '#903e62', '#336033',
        '#d0648f', '#707578', '#7Fa079',
        '#70a17a', '#c07ec0', '#dE4c7e',
        '#8dc1aa', '#c08d71', '#7F9c76',
        '#a05c5c', '#7F9f79', '#2E8f8c',

        '#d88f64', '#757875', '#7579a0',
        '#767aa1', '#c9c07e', '#cc718d',
        '#a95c5c', '#9d623e', '#75799f',
        '#80aac1', '#6a6c6a', '#73769c',
        '#238c8f', '#d17e4c', '#6e3333'
    ];

    protected showToolbarFn: () => void = null;
    protected updatePending = false;
    protected updateShellFn: () => void = null;
    protected subscription: Subscription;
    //
    protected title: string;
    protected appName: string;
    //
    protected goBackFn: () => void = null;
    protected searchControl: FormControl;
    protected searchInputLabel: string;
    //
    buttons: ToolbarButton[] = [];
    //
    protected isLoading = false;
    protected isError = false;
    protected retryCallback: () => void;
    // side nav data
    protected readonly sideNavDataSrc = new MatTreeNestedDataSource<SideNavNode>();

    constructor(public langSrv: LanguageService, public router: Router) {
    }

    /* LOADING */

    public setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
        this.updateShell();
    }

    public showRetry(retryCallback: () => void) {
        this.isError = true;
        this.retryCallback = retryCallback;
    }

    public retry() {
        if (this.retryCallback) {
            this.retryCallback();
        }
        this.isError = false;
    }

    public get loading(): boolean {
        return !this.isError && this.isLoading;
    }

    public get error(): boolean {
        return this.isError;
    }

    /* SIDE NAV */

    public get sideNavDataSource(): MatTreeNestedDataSource<SideNavNode> {
        return this.sideNavDataSrc;
    }

    public setSideNavDataSource(tree: SideNavNode[]) {
        this.sideNavDataSrc.data = tree;
        this.generateNavColors(tree);
        this.updateShell();
    }

    private generateNavColors(tree: SideNavNode[]): void {
        if (tree == null) return;
        tree.forEach(node => {
            node.backgroundColor = this.backgroundColors[
                this.hashString(node.name, this.backgroundColors.length)
            ];
            this.generateNavColors(node.children);
        })
    }

    private hashString(text: string, range: number) {
        if (text == null) return -1;
        const len = text.length;
        if (len === 0) return 0;
        let hash = 0;
        for (let i = 0; i < len; i++) {
            let chr = text.charCodeAt(i);
            hash = ((hash << 5) - (hash + chr)) + chr;
            hash |= 0; // Convert to 32bit integer
            hash += chr;
        }
        hash += len;
        if (hash < 0) hash = -hash;
        return hash % range;
    };

    /* GO BACK */

    public setGoBackFn(goBackFn: () => void) {
        this.goBackFn = goBackFn;
        this.updateShell();
    }

    public setGoBackPath(path: string, relativeActivatedRoute: ActivatedRoute, params?: any) {
        this.setGoBackFn(() => {
            this.router.navigate([path], { relativeTo: relativeActivatedRoute, queryParams: params })
                .then()
        });
    }

    /**
     * Navigates by relative url, this method is a work around
     * since angular router cannot handle the '..' to go to parent
     * @param path
     */
    public setGoBackPathByRelativeUrl(path: string) {
        this.setGoBackFn(() => {
            let url = strTakeUntil(strTakeUntil(this.router.url, '?'), '#');
            if (url.endsWith('/')) {
                url = url.substring(0, url.length - 1);
            }
            let relative = path;
            while (relative.startsWith('..')) {
                relative = relative.substring(2);
                url = strDropEndUntil(url, '/');
                if (relative.length === 0) { break; }
                if (!relative.startsWith('/')) { throw new Error('Invalid relative url ' + path); }
                relative = relative.substring(1);
            }
            url += (relative.length ? '/' : '') + relative;
            this.router.navigateByUrl(url)
                .then()
                .catch(e => console.log(e));
        });
    }

    public goBack(): void {
        if (this.hasGoBackFn) {
            this.isError = false;
            this.isLoading = false;
            this.goBackFn();
        }
    }

    public get hasGoBackFn(): boolean {
        return !!this.goBackFn;
    }

    /* TITLE */

    public get shellTitle(): string {
        return this.title;
    }

    public setTitle(t: string): void {
        this.title = t;
        this.updateShell();
    }

    public get applicationTitle(): string {
        return this.appName;
    }

    public setApplicationTitle(t: string): void {
        this.appName = t;
    }

    /* SEARCH */

    public get hasSearch(): boolean {
        return this.searchControl != null;
    }

    public get searchInputTitle(): string {
        return this.searchInputLabel;
    }

    public get searchFormControl(): FormControl {
        return this.searchControl;
    }

    public disableSearch() {
        this.searchControl = null;
        this.searchInputLabel = null;
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    /**
     * Adds search functionality the title-bar without extra screen space (call ONCE per component, and do not call in it's children)
     *
     * @param inputLabel the title of the search input
     * @param subFn a function that subscribes to an observable, this observable sends search terms
     */
    public enableSearch(inputLabel: string, subFn: (Observable) => Subscription): void {
        this.searchInputLabel = inputLabel;
        if (this.hasSearch) {
            alert(
                'Dear developer, you have called enableSearch twice in a row,\n\t1. either you have not cleared the shellService state by calling .reset()\n\t2. or you called the fuction twice in the same component.\n\t\tContact muaaz.h.is@gmail.com for more information'
            );
        } else {
            this.searchControl = new FormControl();
            this.subscription = subFn(
                this.searchControl.valueChanges.pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                )
            );
            this.updateShell();
        }
    }

    /**
     * call in 'ngOnDestroy' in every component that changes the title, or buttons of the shell
     * to clear things set by other components
     */
    public reset(): void {
        this.title = null;
        this.goBackFn = null;
        this.disableSearch();
        this.buttons = [];
        this.isLoading = false;
        this.isError = false;
        this.updateShell();
    }

    /**
     * Custom buttons
     */
    public setButtons(buttons: ToolbarButton[]): void {
        this.buttons = buttons;
        this.updateShell();
    }

    public addButton(btn: ToolbarButton): void {
        if (this.buttons == null) {
            this.buttons = [];
        }
        this.buttons.push(btn);
        this.updateShell();
    }

    public removeButton(buttonLabel: string): void {
        this.buttons = this.buttons == null
            ? null
            : this.buttons.filter(b => b.label !== buttonLabel);
        this.updateShell();
    }

    public setButtonEnabled(button: ToolbarButton, enabled: boolean): void {
        button.disabled = !enabled;
        this.updateShell();
    }

    // noinspection JSUnusedGlobalSymbols
    public setButtonVisible(button: ToolbarButton, visible: boolean): void {
        button.visible = visible;
        this.updateShell();
    }

    /**
     * Shows the toolbar, used when showing the toolbar is a must (ex: an item in the list was selected)
     * the toolbar is hidden to increase screen size when reading
     */
    public showToolbar(): void {
        if (this.showToolbarFn) {
            this.showToolbarFn();
        }
    }

    public updateShell(): void {
        if (this.updateShellFn) {
            this.updateShellFn();
            this.updatePending = false;
        } else {
            this.updatePending = true;
        }
    }

    public setUpdateShellFn(fn: () => void): void {
        this.updateShellFn = fn;
        if (this.updatePending) {
            this.updateShell();
        }
    }

    public setShowToolbarFn(fn: () => void): void {
        this.showToolbarFn = fn;
    }

    public setQueryParams(activatedRoute: ActivatedRoute, params: any): void {
        this.router.navigate(
            [],
            {
                relativeTo: activatedRoute,
                queryParams: params,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
    }
}
