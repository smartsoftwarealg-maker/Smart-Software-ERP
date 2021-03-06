import { Injectable } from "@angular/core";
import { LanguageService } from '@ss/common/ui-lang';
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
}

@Injectable({
    providedIn: 'root'
})
export class ShellService {

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
        this.updateShell();
    }

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

    public goBack(): void {
        if (this.hasGoBackFn) {
            this.isError = false;
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
        this.searchControl = null;
        this.searchInputLabel = null;
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
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
