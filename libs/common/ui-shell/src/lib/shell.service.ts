import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
    LanguageService, Right,
    SideNavNode,
    strDropEndUntil,
    strDropUntil,
    strTakeUntil,
    UserRightsService
} from '@ss/common/api-common';
import * as _ from 'lodash';

export enum KeepOnToolbar {
    ALWAYS = 1, // replaces true in old version
    NEVER = 2,
    DYNAMIC = 3 // on large screens only
}

export interface ToolbarLabel {
    icon?: string;
    title: string;
    text?: string;
    click?: () => void;
}

export interface ToolbarButton {
    icon: string;
    label: string;
    click?: () => void;
    disabled: boolean;
    visible: boolean;
    keepOnToolbar: KeepOnToolbar; // used to be boolean, true -> ALWAYS, false -> DYNAMIC
    menuItems?: MenuItem[];
}

export interface MenuItem {
    icon: string;
    label: string;
    click: () => void;
    disabled: boolean;
    visible: boolean;
}



@Injectable({
    providedIn: 'root'
})
export class ShellService {
    private _application = '';

    backgroundColors: string[] = [
        '#d88f64', '#806570', '#610B6E',
        '#0B7121', '#21610B', '#6a6c6a',
        '#505aa0', '#6B510B', '#73769c',
        '#238c8f', '#d17e4c', '#6e3333',
        '#4C0B5F', '#210B61', '#0B2161',
        '#0B3861', '#2E2E2E', '#0B5138',
        '#767ae1', '#c9c07e', '#cc718d',
        '#a95c5c', '#9d623e', '#75799f',
        '#0B615E', '#610B38', '#5E710B',
        '#61380B', '#610B0B', '#75a079'
    ];
    private lastHash = -1;

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
    public focusSearchField: boolean;
    protected searchInputLabel: string;
    //
    buttons: ToolbarButton[] = [];
    labels: ToolbarLabel[] = [];
    appButtons: ToolbarButton[] = [];
    //
    protected isLoading = false;
    protected isError = false;
    protected retryCallback: () => void;
    // side nav data
    protected readonly sideNavDataSrc = new MatTreeNestedDataSource<SideNavNode>();
    public navData: SideNavNode[] = [];

    constructor(public langSrv: LanguageService, public router: Router, private rightsSrv: UserRightsService) { }

    /* LOADING */

    public setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
        this.updateShell();
    }

    getLoading(): boolean {
        return this.isLoading;
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

    public getNavNodeByRouter(router: Router): SideNavNode {
        // const url = router.routerState.snapshot.url;
        const url = '/' +
            this.router
                .routerState
                .snapshot
                .url
                .split('/')
                .filter(e => e !== '')
                .splice(0, 3)
                .join('/');
        return this.navData.map(n => this.getNavNodeByUrl(url, n)).filter(n => !!n)[0];
    }

    private getNavNodeByUrl(url: string, node: SideNavNode): SideNavNode {
        if (!node) {
            return null;
        }
        if (node.route === url) {
            return node;
        }
        return !node.children
            ? null
            : node.children.map(n => this.getNavNodeByUrl(url, n)).filter(n => !!n)[0];
    }

    public filterSideNav(): void {
        this.setSideNavVisibility(this.navData);
        this.setAppSideNavVisibility(this.navData);
        this.sideNavDataSrc.data = this.filterSideNavByVisibility(this.navData);

    }

    private filterSideNavByVisibility(tree: SideNavNode[]): SideNavNode[] {
        if (tree == null) {
            return null;
        }
        return tree.filter(i => i.visible)
            .map(i => {
                const clone: SideNavNode = _.cloneDeep(i);
                clone.children = this.filterSideNavByVisibility(i.children);
                return clone;
            })
    }

    private setSideNavVisibility(tree: SideNavNode[]): void {
        if (tree != null) {
            // MUST use for each, MUST NOT change reference of array
            tree.forEach(r => {
                this.setSideNavVisibility(r.children);
                r.visible = (!r.accessRights || this.rightsSrv.canUserPass(r.accessRights)) &&
                    (r.children == null || r.children.find(e => e.visible) != null);
            });
        }
    }

    private setAppSideNavVisibility(tree: SideNavNode[]): void {
        if (tree != null) {
            // MUST use for each, MUST NOT change reference of array
            const userRights = this.rightsSrv.rights;
            tree.forEach(r => {
                r.visible = r.accessRights != null &&
                    (userRights.size == 0 || userRights.get(r.accessRights)?.read === true);
            });
        }
    }



    public getMenuItems(): string[] {
        if (!this.sideNavDataSrc.data) {
            return null;
        }
        const list: string[] = [];
        this.getMenuItemsR({
            icon: null,
            name: null,
            children: this.sideNavDataSrc.data
        }, list);
        return list;
    }

    private getMenuItemsR(n: SideNavNode, output: string[]) {
        if (!n) {
            return;
        }
        if (n.route) {
            output.push((n.name).toUpperCase());
        }
        if (n.children) {
            n.children.forEach(c => this.getMenuItemsR(c, output));
        }
    }

    public get sideNavDataSource(): MatTreeNestedDataSource<SideNavNode> {
        return this.sideNavDataSrc;
    }

    public setSideNavDataSource(tree: SideNavNode[]) {
        this.navData = tree;
        this.sideNavDataSrc.data = [];
        this.generateNavColors(tree);
        this.updateShell();
    }

    private generateNavColors(tree: SideNavNode[]): void {
        if (tree == null) return;
        tree.forEach(node => {
            node.backgroundColor = this.backgroundColors[
                this.hashString(node.name, this.backgroundColors.length)
            ];
        });
        tree.forEach(node => {
            this.generateNavColors(node.children);
        });
    }

    private hashString(text: string, range: number) {
        if (text == null) return -1;
        const len = text.length;
        if (len === 0) return 0;
        let hash = 0;
        for (let i = 0; i < len; i++) {
            const chr = text.charCodeAt(i) * 7907; // a prime
            // tslint:disable-next-line:no-bitwise
            hash = ((hash << 5) - (hash + chr)) + chr;
            // tslint:disable-next-line:no-bitwise
            hash |= 0; // Convert to 32bit integer
            hash -= chr * 7919; // a prime
        }
        hash += len * 7841; // a prime
        if (hash < 0) hash = -hash;
        let hashResult = hash % range;
        if (hashResult === this.lastHash) {
            hashResult = (hashResult + 1) % range;
        }
        this.lastHash = hashResult;
        return hashResult;
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

    public getApp() {
        return this.router.url.split('/')[2].replace('-app', ''); // strTakeUntil(strTakeUntil(strDropUntil(this.router.url, '/app/'), '?'), '#');
    }

    public navigateByRelativeUrl(path: string): void {
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
    }

    /**
     * Navigates by relative url, this method is a work around
     * since angular router cannot handle the '..' to go to parent
     * @param path
     */
    public setGoBackPathByRelativeUrl(path: string) {
        this.setGoBackFn(() => this.navigateByRelativeUrl(path));
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

    public disableSearch(updateShell: boolean = true) {
        this.searchControl = null;
        this.focusSearchField = false;
        this.searchInputLabel = null;
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        if (updateShell) {
            this.updateShell();
        }
    }

    /**
     * Adds search functionality the title-bar without extra screen space (call ONCE per component, and do not call in it's children)
     *
     * @param inputLabel the title of the search input
     * @param subFn a function that subscribes to an observable, this observable sends search terms
     */
    public enableSearch(inputLabel: string, subFn: (a: Observable<any>) => any, focusField: boolean = false): void {
        this.searchInputLabel = inputLabel;
        if (this.hasSearch) {
            alert(
                'Dear developer, you have called enableSearch twice in a row,\n\t1. either you have not cleared the shellService state by calling .reset()\n\t2. or you called the fuction twice in the same component.\n\t\tContact muaaz.h.is@gmail.com for more information'
            );
        } else {
            this.searchControl = new FormControl();
            this.subscription = subFn(
                this.searchControl
                    .valueChanges
                    .pipe(debounceTime(300),
                    distinctUntilChanged())
            );
            this.updateShell();
        }
        this.focusSearchField = focusField;
    }

    /**
     * call in 'ngOnDestroy' in every component that changes the title, or buttons of the shell
     * to clear things set by other components
     */
    public reset(): void {
        this.title = null;
        this.goBackFn = null;
        this.disableSearch(false);
        this.buttons = [];
        this.isLoading = false;
        this.isError = false;
        this.updateShell();
    }

    /**
     * Custom buttons
     */
    public setAppButtons(buttons: ToolbarButton[]): void {
        this.appButtons = buttons;
        this.updateShell();
    }

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

    public setLabels(labels: ToolbarLabel[]): void {
        this.labels = labels;
        //console.log(labels);
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
    get application() {
        return this._application;
    }
    set application(str: string) {
        this._application = str;
    }

    getRights(component: string): Right {
        return this.rightsSrv.getUserRights(component);
    }
}
