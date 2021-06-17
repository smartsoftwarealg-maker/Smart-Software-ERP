import {Injectable, OnDestroy} from '@angular/core';
import {NavigationEnd, Router, Routes} from '@angular/router';
import {MAIN_PAGE_URL} from 'smart-shared';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

export interface NavItem {
    level: number;
    path: string;
    title: string;
    isMenuNodeOnly: boolean;
    children: NavItem[];
}

@Injectable({
    providedIn: 'root'
})
export class NavService implements OnDestroy {

    public treeControl = new NestedTreeControl<NavItem>(node => node.children);
    public dataSource = new MatTreeNestedDataSource<NavItem>();

    private routerSubscription: Subscription;

    public root: NavItem;
    public active: NavItem;
    public activeStack: NavItem[] = [];
    private moduleIndex: { [key: string]: NavItem; };
    public isMainPage = false;

    hasChild = (_: number, node: NavItem) => node.children.length;
    isActive = (node: NavItem) => this.isNodeActive(node);

    public init(routes: Routes, router: Router): void {
        this.moduleIndex = {};
        this.root = {
            level: 0,
            path: '/',
            title: '',
            isMenuNodeOnly: true,
            children: []
        };
        this.parseRoutes(this.root, routes, this.root.children);
        this.dataSource.data = this.root.children;
        this.active = this.root;
        this.activeStack = [this.active];
        this.routerSubscription = router.events.pipe(
            filter(e => e instanceof NavigationEnd)
        ).subscribe((e: NavigationEnd) => this.findActiveItem(e.urlAfterRedirects));
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
            this.routerSubscription = null;
        }
    }

    public getRootOfModule(module: string): NavItem {
        const item: NavItem = this.moduleIndex[module];
        if (item == null) {
            throw new Error('Module `' + module + '` Not Found');
        }
        return item;
    }

    public setChildren(module: string, routes: Routes): void {
        const item = this.getRootOfModule(module);
        this.parseRoutes(item, routes, item.children);
    }

    private parseRoutes(parent: NavItem, routes: Routes, out: NavItem[]): void {
        if (routes == null) {
            return;
        }
        routes.filter(r => r.redirectTo == null && (r.path == null || r.path.indexOf(':') !== 1))
            .forEach(r => {
                if (r.path === '') {
                    this.parseRoutes(parent, r.children, parent.children);
                } else {
                    const item: NavItem = {
                        level: parent.level + 1,
                        isMenuNodeOnly: r.path == null,
                        path: parent.path + (r.path == null ? '' : (r.path + '/')),
                        title: r.data != null && r.data.title != null ? r.data.title : '',
                        children: []
                    };
                    this.parseRoutes(item, r.children, item.children);
                    /* index modules */
                    // if (r.loadChildren && isString(r.loadChildren)) {
                    //     const modulePath = (r.loadChildren as string);
                    //     const i = modulePath.indexOf('#');
                    //     this.moduleIndex[modulePath.substr(1 + i)] = item;
                    // }
                    if (r.loadChildren != null) {
                        if (r.data == null || r.data.moduleName == null) {
                            throw new Error('Route "' + item.path + '" is missing moduleName in data, Ask Muaaz For more Info');
                        }
                        this.moduleIndex[r.data.moduleName] = item;
                    }
                    out.push(item);
                }
            });
    }

    private findActiveChild(node: NavItem, path: string): NavItem[] {
        if (!path.startsWith(node.path)) {
            return null;
        }
        // has no children, it must be it
        if (!node.children.length) {
            return [node];
        }
        const found: NavItem[][] = node.children
            .map(c => this.findActiveChild(c, path))
            .filter(c => c != null)
            .sort((a, b) => a.length - b.length);
        const stack = found[0];
        if (stack == null) {
            return node.isMenuNodeOnly ? null : [node];
        }
        stack.unshift(node);
        return stack;
    }

    private findActiveItem(path: string): void {
        if (this.root == null) {
            return;
        }
        this.isMainPage = path === ('/' + MAIN_PAGE_URL);
        this.activeStack = this.findActiveChild(this.root, path + '/');
        if (this.activeStack == null) {
            this.activeStack = [this.root];
        }
        this.active = this.activeStack[this.activeStack.length - 1];
    }

    private isNodeActive(node: NavItem) {
        if (this.activeStack.length <= node.level) {
            return false;
        }
        if (this.activeStack[node.level].path === node.path) {
            if (node.isMenuNodeOnly) {
                const children = node.children;
                for (const child of children) {
                    if (this.isNodeActive(child)) {
                        return true;
                    }
                }
                return false;
            }
            return true;
        }
        return false;
    }
}
